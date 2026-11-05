import type { JsonRpcMessage } from "./json-rpc-message.ts";

export interface StdioSession {
  send: (message: JsonRpcMessage) => void;
  receive: <Result>() => Promise<JsonRpcMessage<Result>>;
  close: () => Promise<number | null>;
  kill: () => Promise<number | null>;
  stderr: () => string;
}
