import { isValidManifest, validateManifest } from "@usemcpkit/core";
import { expectedServerName } from "./expected-server-name";

export const checkManifestJson = (json: string, dir: string) => {
  const data: unknown = JSON.parse(json);
  if (!isValidManifest(data)) {
    return { errors: validateManifest(data) };
  }
  const expected = expectedServerName(dir);
  if (data.name !== expected) {
    return { errors: [`name "${data.name}" must match folder name "${dir}" (expected "${expected}")`] };
  }
  return { manifest: data, errors: [] };
};
