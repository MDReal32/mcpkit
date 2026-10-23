import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadFileArgs } from "../src/execution/request/load-file-args";
import { ToolError } from "../src/main";
import { createItemTool } from "./fixtures/demo-manifest";

const uploadTool = { ...createItemTool, request: { ...createItemTool.request, fileArgs: ["file"] } };

describe("loadFileArgs", () => {
  it("replaces a file path argument with the file name and bytes", async () => {
    const dir = await mkdtemp(join(tmpdir(), "mcpkit-"));
    const path = join(dir, "note.txt");
    await writeFile(path, "hi");

    const args = await loadFileArgs(uploadTool, { owner: "o", file: path });

    expect(args.file).toEqual({ name: "note.txt", data: new TextEncoder().encode("hi") });
    expect(args.owner).toBe("o");
  });

  it("loads every path of an array argument", async () => {
    const dir = await mkdtemp(join(tmpdir(), "mcpkit-"));
    const first = join(dir, "a.txt");
    const second = join(dir, "b.txt");
    await writeFile(first, "a");
    await writeFile(second, "b");

    const args = await loadFileArgs(uploadTool, { file: [first, second] });

    expect(args.file).toEqual([
      { name: "a.txt", data: new TextEncoder().encode("a") },
      { name: "b.txt", data: new TextEncoder().encode("b") },
    ]);
  });

  it("fails with a ToolError when the file cannot be read", async () => {
    await expect(loadFileArgs(uploadTool, { file: "/nonexistent/mcpkit-file" })).rejects.toBeInstanceOf(ToolError);
  });
});
