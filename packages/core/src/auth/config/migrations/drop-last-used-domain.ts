import { isJsonObject } from "../../../json";

/** 2 → 3: the last used `domain` is dropped, the hosts it was kept in already list it. */
export const dropLastUsedDomain = (server: Readonly<Record<string, unknown>>) => {
  const { domain, ...rest } = server;
  if (typeof domain !== "string") {
    return rest;
  }
  const hosts = isJsonObject(rest.hosts) ? rest.hosts : {};
  return { ...rest, hosts: { [domain]: {}, ...hosts } };
};
