import { describe, expect, it, vi } from "vitest";
import { handleRequest } from "../src/http";
import type { WorkerEnv } from "../src/types";

const createEnv = () => {
  const run = vi.fn(async () => undefined);
  const bind = vi.fn(() => ({ run }));
  const env: WorkerEnv = { DB: { prepare: () => ({ bind }) } };
  return { env, bind };
};

const post = (body: string) => new Request("https://usage.test/v1/use", { method: "POST", body });

describe("handleRequest", () => {
  it("counts a valid event", async () => {
    const { env, bind } = createEnv();
    const response = await handleRequest(post('{"tool":"git:github:repos:get","version":"0.3.2","os":"darwin"}'), env);
    expect(response.status).toBe(204);
    expect(bind).toHaveBeenCalledWith(
      expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
      "git:github:repos:get",
      "0.3.2",
      "darwin",
    );
  });

  it.each([
    '{"tool":"x","version":"1","os":"darwin"}',
    '{"tool":"a:b:c","version":"1","os":"plan9"}',
    '{"tool":"a:b:c","version":"1","os":"linux","token":"secret"} garbage',
    "not json",
  ])("rejects %s", async (body) => {
    const { env, bind } = createEnv();
    expect((await handleRequest(post(body), env)).status).toBe(400);
    expect(bind).not.toHaveBeenCalled();
  });

  it("rejects other routes", async () => {
    const { env } = createEnv();
    expect((await handleRequest(new Request("https://usage.test/", { method: "GET" }), env)).status).toBe(404);
  });
});
