import { describe, expect, it } from "vitest";
import { ngrok } from "../src/servers/ngrok/ngrok";

const oauth = ngrok.auth?.find((entry) => entry.type === "oauth");

describe("ngrok sign-in scopes", () => {
  it("requests scopes, since ngrok denies a sign-in that names none", () => {
    expect(oauth?.scopes?.length).toBeGreaterThan(0);
  });

  it("asks only for read scopes", () => {
    expect(oauth?.scopes?.filter((scope) => !scope.endsWith(":read"))).toEqual([]);
  });

  it("lists no scope twice", () => {
    expect(new Set(oauth?.scopes).size).toBe(oauth?.scopes?.length);
  });
});
