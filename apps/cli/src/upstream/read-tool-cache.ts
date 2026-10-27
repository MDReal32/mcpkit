import { readFile } from "node:fs/promises";
import { isJsonObject, isMissingFileError } from "@usemcpkit/core";
import { resolveToolCachePath } from "./resolve-tool-cache-path";
import type { ToolCache } from "./types/tool-cache";

export const readToolCache = async (dir: string, serverId: string) => {
  try {
    const body: unknown = JSON.parse(await readFile(resolveToolCachePath(dir, serverId), "utf8"));
    if (!isJsonObject(body) || typeof body.discoveredAt !== "string" || !Array.isArray(body.tools)) {
      return undefined;
    }
    return body as unknown as ToolCache;
  } catch (error) {
    if (isMissingFileError(error)) {
      return undefined;
    }
    throw error;
  }
};
