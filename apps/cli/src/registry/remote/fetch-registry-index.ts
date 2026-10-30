import { FETCH_TIMEOUT_MS, INDEX_FILE_NAME } from "../const";
import type { RegistryContext } from "../types/registry-context";
import { fetchText } from "./fetch-text";
import { parseRegistryIndex } from "./parse-registry-index";

export const fetchRegistryIndex = async ({ registryUrl, fetchImpl }: RegistryContext, timeoutMs = FETCH_TIMEOUT_MS) => {
  const url = new URL(INDEX_FILE_NAME, `${registryUrl.replace(/\/$/, "")}/`).href;
  const body: unknown = JSON.parse(await fetchText(url, fetchImpl, timeoutMs));
  return parseRegistryIndex(body);
};
