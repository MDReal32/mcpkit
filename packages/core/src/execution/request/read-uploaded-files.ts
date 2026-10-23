import { readFile } from "node:fs/promises";
import { basename } from "node:path";
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

export const readUploadedFiles = (argName: string, value: unknown) =>
  Array.isArray(value)
    ? Promise.all(value.map((path) => readUploadedFile(argName, path)))
    : readUploadedFile(argName, value);
