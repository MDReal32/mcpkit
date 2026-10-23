import { describe, expect, it } from "vitest";
import { resolveStaticAuth } from "../src/auth";
import { AuthError } from "../src/main";
import { DEMO_ENV } from "./fixtures/demo-manifest";

describe("resolveStaticAuth", () => {
  it("builds headers and query params per static strategy", () => {
    expect(resolveStaticAuth({ type: "bearer", env: "TOKEN" }, "x", DEMO_ENV).headers).toEqual({
      Authorization: "Bearer secret",
    });
    expect(
      resolveStaticAuth({ type: "header", env: "TOKEN", name: "X-Key", prefix: "k " }, "x", DEMO_ENV).headers,
    ).toEqual({
      "X-Key": "k secret",
    });
    expect(resolveStaticAuth({ type: "query", env: "TOKEN", name: "key" }, "x", DEMO_ENV).query).toEqual({
      key: "secret",
    });
    expect(
      resolveStaticAuth({ type: "basic", usernameEnv: "TOKEN", passwordEnv: "TOKEN" }, "x", DEMO_ENV).headers
        .Authorization,
    ).toBe(`Basic ${Buffer.from("secret:secret").toString("base64")}`);
    expect(resolveStaticAuth({ type: "none" }, "x", DEMO_ENV)).toEqual({ headers: {}, query: {} });
  });

  it("throws a clear error when the secret env var is missing", () => {
    const resolveMissing = () => resolveStaticAuth({ type: "bearer", env: "NOPE" }, "demo", {});

    expect(resolveMissing).toThrow(AuthError);
    expect(resolveMissing).toThrow(/set the NOPE environment variable/);
  });
});
