import { isJsonObject } from "../../../json";
import { DEFAULT_HOST_KEY } from "../../const";

/** 1 → 2: a server's `secrets` move under the host of its domain, and the domain itself becomes a known host. */
export const moveSecretsUnderHost = (server: Readonly<Record<string, unknown>>) => {
  const { secrets, ...rest } = server;
  const domain = typeof rest.domain === "string" ? rest.domain : undefined;
  const hosts: Record<string, unknown> = {
    ...(domain === undefined ? {} : { [domain]: {} }),
    ...(isJsonObject(rest.hosts) ? rest.hosts : {}),
  };
  const host = domain ?? DEFAULT_HOST_KEY;
  if (isJsonObject(secrets)) {
    const current = isJsonObject(hosts[host]) ? hosts[host] : {};
    const currentSecrets = isJsonObject(current.secrets) ? current.secrets : {};
    hosts[host] = { ...current, secrets: { ...secrets, ...currentSecrets } };
  }
  return Object.keys(hosts).length === 0 ? rest : { ...rest, hosts };
};
