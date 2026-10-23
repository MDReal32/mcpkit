import { createHash } from "node:crypto";
import { mkdir, readFile, realpath, stat, symlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { useTempDir } from "@usemcpkit/testing";
import { describe, expect, it } from "vitest";
import type { BinaryContext } from "../src/main";
import {
  autoUpdateBinary,
  detectPackageManagerInstall,
  extractTarFile,
  findPackageManagerInstall,
  installBinary,
  readPackageRelease,
  updateBinary,
  verifyIntegrity,
} from "../src/main";
import { createBinaryFetch } from "./fixtures/create-binary-fetch";
import { createTar } from "./fixtures/create-tar";

const readDir = useTempDir("mcpkit-binary-");

const REGISTRY = "https://reg.example";

const toIntegrity = (bytes: Uint8Array) => `sha512-${createHash("sha512").update(bytes).digest("base64")}`;

const createReleaseFetch = (version: string, binary: string) => {
  const tarball = gzipSync(createTar([{ path: "package/bin/mcpkit", content: binary }]));
  const tarballUrl = `${REGISTRY}/cli-darwin-arm64-${version}.tgz`;
  return createBinaryFetch({
    [`${REGISTRY}/@usemcpkit%2fcli-darwin-arm64`]: {
      "dist-tags": { latest: version },
      versions: { [version]: { dist: { tarball: tarballUrl, integrity: toIntegrity(tarball) } } },
    },
    [tarballUrl]: new Uint8Array(tarball),
  });
};

const createContext = (fetchImpl: typeof fetch) => {
  const context: BinaryContext = {
    target: "darwin-arm64",
    env: { MCPKIT_HOME: readDir(), MCPKIT_NPM_REGISTRY: `${REGISTRY}/` },
    fetchImpl,
  };
  return context;
};

describe("extractTarFile", () => {
  it("returns the requested file and skips the others", () => {
    const archive = createTar([
      { path: "package/package.json", content: "{}" },
      { path: "mcpkit", prefix: "package/bin", content: "binary" },
    ]);

    expect(new TextDecoder().decode(extractTarFile(archive, "package/bin/mcpkit"))).toBe("binary");
  });

  it("fails when the file is missing", () => {
    expect(() => extractTarFile(createTar([{ path: "package/a", content: "" }]), "package/b")).toThrow(
      "tarball has no package/b",
    );
  });
});

describe("verifyIntegrity", () => {
  const bytes = new TextEncoder().encode("mcpkit");

  it("accepts matching sha512 integrity", () => {
    expect(() => verifyIntegrity(bytes, toIntegrity(bytes), "x")).not.toThrow();
  });

  it("rejects a mismatch and unknown algorithms", () => {
    expect(() => verifyIntegrity(bytes, toIntegrity(new Uint8Array([1])), "x")).toThrow(/does not match/);
    expect(() => verifyIntegrity(bytes, "md5-abc", "x")).toThrow(/unsupported integrity/);
  });
});

describe("readPackageRelease", () => {
  const metadata = {
    "dist-tags": { latest: "1.2.0" },
    versions: { "1.2.0": { dist: { tarball: "https://t/1.2.0.tgz", integrity: "sha512-x" } } },
  };

  it("resolves dist-tags to a version", () => {
    expect(readPackageRelease(metadata, "pkg", "latest")).toEqual({
      version: "1.2.0",
      tarball: "https://t/1.2.0.tgz",
      integrity: "sha512-x",
    });
  });

  it("fails for unpublished versions", () => {
    expect(() => readPackageRelease(metadata, "pkg", "9.9.9")).toThrow("pkg@9.9.9 is not published");
  });
});

describe("updateBinary", () => {
  it("replaces the binary with a newer verified release", async () => {
    const path = join(readDir(), "bin", "mcpkit");
    await mkdir(join(readDir(), "bin"));
    await writeFile(path, "old");

    const result = await updateBinary(createContext(createReleaseFetch("0.2.0", "new")), path, "0.1.0");

    expect(result).toEqual({ status: "updated", from: "0.1.0", to: "0.2.0", path });
    expect(await readFile(path, "utf8")).toBe("new");
    expect((await stat(path)).mode & 0o111).not.toBe(0);
  });

  it("keeps the binary when the latest release is not newer", async () => {
    const result = await updateBinary(createContext(createReleaseFetch("0.1.0", "same")), "unused", "0.1.0");

    expect(result).toEqual({ status: "up-to-date", version: "0.1.0" });
  });

  it("explains how to proceed when the platform package is not published", async () => {
    await expect(updateBinary(createContext(createBinaryFetch({})), "unused", "0.1.0")).rejects.toThrow(
      /@usemcpkit\/cli-darwin-arm64 is not published on https:\/\/reg\.example; .*--binary/,
    );
  });
});

describe("installBinary", () => {
  it("copies a local binary into MCPKIT_HOME/bin", async () => {
    const source = join(readDir(), "local-mcpkit");
    await writeFile(source, "local");

    const installed = await installBinary(createContext(createBinaryFetch({})), { path: source, version: "0.1.0" });

    expect(installed).toEqual({ path: join(readDir(), "bin", "mcpkit"), version: "0.1.0" });
    expect(await readFile(installed.path, "utf8")).toBe("local");
  });

  it("downloads the running version when not started from a binary", async () => {
    const installed = await installBinary(createContext(createReleaseFetch("0.3.0", "downloaded")), {
      version: "0.3.0",
    });

    expect(await readFile(installed.path, "utf8")).toBe("downloaded");
  });
});

describe("autoUpdateBinary", () => {
  it("does nothing outside the installed binary", async () => {
    expect(await autoUpdateBinary(createContext(createBinaryFetch({})), "0.1.0")).toBeUndefined();
  });
});

describe("findPackageManagerInstall", () => {
  it("points Homebrew installs at the linked bin path that survives upgrades", () => {
    expect(findPackageManagerInstall("/opt/homebrew/Cellar/mcpkit/0.2.0/bin/mcpkit")).toEqual({
      manager: "Homebrew",
      path: "/opt/homebrew/bin/mcpkit",
      upgradeCommand: "brew upgrade mcpkit",
    });
    expect(findPackageManagerInstall("/home/linuxbrew/.linuxbrew/Cellar/mcpkit/0.2.0/bin/mcpkit")?.path).toBe(
      "/home/linuxbrew/.linuxbrew/bin/mcpkit",
    );
  });

  it("keeps winget installs in their package folder and names the package id", () => {
    const path =
      "C:\\Users\\me\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Mcpkit.Mcpkit_Microsoft.Winget.Source_8wekyb3d8bbwe\\mcpkit.exe";

    expect(findPackageManagerInstall(path)).toEqual({
      manager: "winget",
      path,
      upgradeCommand: "winget upgrade --id Mcpkit.Mcpkit",
    });
  });

  it("ignores binaries outside a package manager", () => {
    expect(findPackageManagerInstall("/Users/me/.mcpkit/bin/mcpkit")).toBeUndefined();
  });
});

describe("detectPackageManagerInstall", () => {
  it("follows the Homebrew bin link into the Cellar", async () => {
    const prefix = await realpath(readDir());
    const cellarBinary = join(prefix, "Cellar/mcpkit/0.2.0/bin/mcpkit");
    await mkdir(join(prefix, "Cellar/mcpkit/0.2.0/bin"), { recursive: true });
    await mkdir(join(prefix, "bin"));
    await writeFile(cellarBinary, "binary");
    await symlink(cellarBinary, join(prefix, "bin/mcpkit"));

    expect((await detectPackageManagerInstall(join(prefix, "bin/mcpkit")))?.path).toBe(join(prefix, "bin/mcpkit"));
  });

  it("ignores runs under node", async () => {
    expect(await detectPackageManagerInstall()).toBeUndefined();
  });
});
