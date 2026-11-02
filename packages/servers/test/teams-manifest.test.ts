import { isValidManifest } from "@usemcpkit/core";
import { describe, expect, it } from "vitest";
import { teams } from "../src/servers/teams/teams";

describe("teams manifest", () => {
  it("is valid and describes a form input for every credential it forwards", () => {
    const { upstream } = teams;

    expect(isValidManifest(teams)).toBe(true);
    expect(upstream?.type).toBe("stdio");
    const inputs = upstream?.type === "stdio" ? Object.keys(upstream.ui?.inputs ?? {}) : [];
    expect(inputs.sort()).toEqual([...(upstream?.type === "stdio" ? (upstream.forwardEnv ?? []) : [])].sort());
  });
});
