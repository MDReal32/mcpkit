import { describe, expect, it } from "vitest";
import { TARGETS, usemcpkitBinaries } from "../plugins/binaries";

describe("usemcpkitBinaries", () => {
  it("runs only in build mode", () => {
    expect(usemcpkitBinaries({ version: "0.0.0", targets: ["darwin-arm64"] }).apply).toBe("build");
  });

  it("fails fast on unknown targets and lists the known ones", () => {
    expect(() => usemcpkitBinaries({ version: "0.0.0", targets: ["darwin-arm64", "amiga-m68k"] })).toThrow(
      `unknown target(s): amiga-m68k. Known: ${TARGETS.join(", ")}`,
    );
  });
});
