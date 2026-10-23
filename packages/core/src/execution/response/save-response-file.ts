import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { ToolError } from "../tool-error";

export const saveResponseFile = async (response: Response, path: unknown) => {
  if (typeof path !== "string" || path === "") {
    throw new ToolError("The save path must be a non-empty string");
  }
  const bytes = new Uint8Array(await response.arrayBuffer());
  try {
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, bytes);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new ToolError(`Cannot save the response to ${path}: ${reason}`);
  }
  return { savedTo: path, bytes: bytes.byteLength, contentType: response.headers.get("content-type") };
};
