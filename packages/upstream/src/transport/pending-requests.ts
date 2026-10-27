import { REQUEST_TIMEOUT_MS } from "../const";
import type { JsonRpcMessage } from "../types/json-rpc-message";
import { UpstreamError } from "../upstream-error";

interface PendingRequest {
  resolve: (result: unknown) => void;
  reject: (error: Error) => void;
  timer: NodeJS.Timeout;
}

/** Matches JSON-RPC replies to the requests waiting for them. */
export class PendingRequests {
  private nextId = 1;
  private readonly waiting = new Map<number | string, PendingRequest>();

  open() {
    const id = this.nextId;
    this.nextId += 1;
    const reply = new Promise<unknown>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiting.delete(id);
        reject(new UpstreamError(`no reply within ${REQUEST_TIMEOUT_MS / 1000}s`));
      }, REQUEST_TIMEOUT_MS);
      this.waiting.set(id, { resolve, reject, timer });
    });
    reply.catch(() => this.forget(id));
    return { id, reply };
  }

  forget(id: number) {
    const pending = this.waiting.get(id);
    if (pending) {
      clearTimeout(pending.timer);
      this.waiting.delete(id);
    }
  }

  settle(message: JsonRpcMessage) {
    if (message.id === undefined) {
      return;
    }
    const pending = this.waiting.get(message.id);
    if (!pending) {
      return;
    }
    this.waiting.delete(message.id);
    clearTimeout(pending.timer);
    if (message.error) {
      pending.reject(new UpstreamError(message.error.message));
      return;
    }
    pending.resolve(message.result);
  }

  rejectAll(error: Error) {
    for (const pending of this.waiting.values()) {
      clearTimeout(pending.timer);
      pending.reject(error);
    }
    this.waiting.clear();
  }
}
