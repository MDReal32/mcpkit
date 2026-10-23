import { isJsonObject } from "../../../json";

/** The URLs that may contain `{domain}`: baseUrl and the oauth endpoints. */
export const readTemplatableUrls = (manifest: Readonly<Record<string, unknown>>) => {
  const authEntries = Array.isArray(manifest.auth) ? manifest.auth.filter(isJsonObject) : [];
  const authUrls = authEntries.flatMap((auth) => [auth.authorizationUrl, auth.tokenUrl]);
  return [manifest.baseUrl, ...authUrls].filter((url) => typeof url === "string");
};
