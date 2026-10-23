import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import type { ToolArgs, ToolSpec } from "../../manifest";
import { ToolError } from "../tool-error";
import type { UploadedFile } from "./uploaded-file";

const readUploadedFile = async (argName: string, path: unknown): Promise<UploadedFile> => {
  if (typeof path !== "string") {
    throw new ToolError(`Argument "${argName}" must be the path of a local file`);
  }
  try {
    return { name: basename(path), data: new Uint8Array(await readFile(path)) };
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new ToolError(`Cannot read the file for "${argName}": ${reason}`);
  }
};

export const loadFileArgs = async ({ request }: ToolSpec, args: ToolArgs): Promise<ToolArgs> => {
  const present = (request.fileArgs ?? []).filter((argName) => args[argName] !== undefined);
  const files = await Promise.all(
    present.map(async (argName) => [argName, await readUploadedFile(argName, args[argName])]),
  );
  return { ...args, ...Object.fromEntries(files) };
};
