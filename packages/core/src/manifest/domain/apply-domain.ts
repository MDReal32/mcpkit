import type { Manifest } from "../types/manifest";
import { applyAuthDomain } from "./apply-auth-domain";
import { applyToolEdition } from "./apply-tool-edition";
import { fillDomainUrl } from "./fill-domain-url";
import { findEdition } from "./find-edition";

/** A copy of the manifest with `{domain}` filled in and each tool set to the domain's edition; without a domain the manifest is returned as is. */
export const applyDomain = (manifest: Manifest, domain: string | undefined) => {
  if (domain === undefined) {
    return manifest;
  }
  const loopbackHttp = manifest.domain?.loopbackHttp === true;
  const editionName = findEdition(manifest.editions, domain);
  const resolved: Manifest = {
    ...manifest,
    baseUrl: fillDomainUrl(manifest.baseUrl, domain, loopbackHttp),
    upstream:
      manifest.upstream?.type === "http"
        ? {
            ...manifest.upstream,
            url: fillDomainUrl(manifest.upstream.url, domain, loopbackHttp),
            ...(manifest.upstream.auth && {
              auth: manifest.upstream.auth.map((auth) => applyAuthDomain(auth, domain, loopbackHttp)),
            }),
          }
        : manifest.upstream,
    auth: manifest.auth?.map((auth) => applyAuthDomain(auth, domain, loopbackHttp)),
    tools: manifest.tools.map((tool) => applyToolEdition(tool, editionName)),
  };
  return resolved;
};
