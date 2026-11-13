import type { Manifest } from "@usemcpkit/core";
import { publishLocalSpec } from "./publish-local-spec";
import type { PublishedSpecs } from "./types/published-specs";

/**
 * The manifest with every source that names a document of the server's folder (a description written by hand) pointing
 * at its copy in the registry, `<category>/<name>/<file>`, and those documents.
 */
export const publishLocalSpecs = async (manifest: Manifest, serverDir: string) => {
  if (!manifest.openapi) {
    const unchanged: PublishedSpecs = { manifest, files: [], sources: [] };
    return unchanged;
  }
  const specs = await Promise.all(
    manifest.openapi.sources.map((source) => publishLocalSpec(source, manifest, serverDir)),
  );
  const published: PublishedSpecs = {
    manifest: { ...manifest, openapi: { ...manifest.openapi, sources: specs.map((spec) => spec.source) } },
    files: specs.flatMap((spec) => spec.file ?? []),
    sources: specs.flatMap((spec) => spec.sourceFile ?? []),
  };
  return published;
};
