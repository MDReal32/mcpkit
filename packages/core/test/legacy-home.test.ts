import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import { adoptLegacyHome, resolveLegacyHomeDir } from "../src/main";

const readRoot = useTempDir("usemcpkit-legacy-home-");

const readLegacy = () => join(readRoot(), ".mcpkit");

const readHome = () => join(readRoot(), ".usemcpkit");

describe("adoptLegacyHome", () => {
  it("copies the saved credentials of the old mcpkit home once", async () => {
    await mkdir(readLegacy());
    await writeFile(join(readLegacy(), "config.json"), '{"version": 3}\n');
    await writeFile(join(readLegacy(), "tokens.json"), "{}\n");

    expect(await adoptLegacyHome(readHome(), readLegacy())).toBe(true);
    expect(await readFile(join(readHome(), "config.json"), "utf8")).toBe('{"version": 3}\n');
    expect(await readFile(join(readHome(), "tokens.json"), "utf8")).toBe("{}\n");
    await expect(readFile(join(readHome(), "secrets.json"))).rejects.toThrow();

    await writeFile(join(readLegacy(), "config.json"), '{"version": 4}\n');
    expect(await adoptLegacyHome(readHome(), readLegacy())).toBe(false);
    expect(await readFile(join(readHome(), "config.json"), "utf8")).toBe('{"version": 3}\n');
  });

  it("leaves a home that already saved something alone", async () => {
    await mkdir(readLegacy());
    await mkdir(readHome());
    await writeFile(join(readLegacy(), "config.json"), '{"old": true}\n');
    await writeFile(join(readHome(), "secrets.json"), "{}\n");

    expect(await adoptLegacyHome(readHome(), readLegacy())).toBe(false);
    await expect(readFile(join(readHome(), "config.json"))).rejects.toThrow();
  });

  it("copies nothing without an old home", async () => {
    expect(await adoptLegacyHome(readHome(), readLegacy())).toBe(false);
  });
});

describe("resolveLegacyHomeDir", () => {
  it("never adopts into a home folder chosen with USEMCPKIT_HOME", () => {
    expect(resolveLegacyHomeDir({ USEMCPKIT_HOME: readRoot() })).toBeUndefined();
    expect(resolveLegacyHomeDir({})?.endsWith(".mcpkit")).toBe(true);
  });
});
