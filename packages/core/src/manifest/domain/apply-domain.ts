import type { Manifest } from "../types/manifest";
import { applyAuthDomain } from "./apply-auth-domain";
import { applyToolEdition } from "./apply-tool-edition";
import { fillDomain } from "./fill-domain";
import { findEdition } from "./find-edition";

/** A copy of the manifest with `{domain}` filled in and each tool set to the domain's edition; without a domain the manifest is returned as is. */
export const applyDomain = (manifest: Manifest, domain: string | undefined) => {
  if (domain === undefined) {
    return manifest;
  }
  const editionName = findEdition(manifest.editions, domain);
  const resolved: Manifest = {
    ...manifest,
    baseUrl: fillDomain(manifest.baseUrl, domain),
    auth: manifest.auth?.map((auth) => applyAuthDomain(auth, domain)),
    tools: manifest.tools.map((tool) => applyToolEdition(tool, editionName)),
  };
  return resolved;
};
