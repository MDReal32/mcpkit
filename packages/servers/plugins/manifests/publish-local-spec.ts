import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Manifest, OpenApiSource } from "@usemcpkit/core";
import { isLocalSpecUrl } from "./is-local-spec-url";
import type { PublishedSpec } from "./types/published-spec";

/** A source whose url names a document of the server's folder points at its copy in the registry, pinned by its sha256. */
export const publishLocalSpec = async (source: OpenApiSource, manifest: Manifest, serverDir: string) => {
  if (!isLocalSpecUrl(source.url)) {
    const remote: PublishedSpec = { source };
    return remote;
  }
  const sourceFile = join(serverDir, source.url);
  const json = await readFile(sourceFile, "utf8");
  const path = `${manifest.category}/${manifest.name}/${source.url}`;
  const published: PublishedSpec = {
    source: { ...source, url: path, sha256: createHash("sha256").update(json).digest("hex") },
    file: { path, json },
    sourceFile,
  };
  return published;
};
