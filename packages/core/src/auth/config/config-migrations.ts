import { isJsonObject } from "../../json";
import type { Migration } from "../../migrations";
import { DEFAULT_HOST_KEY } from "../const";

/** 1 → 2: a server's `secrets` move under the host of its domain, and the domain itself becomes a known host. */
const moveSecretsUnderHost = (server: Readonly<Record<string, unknown>>) => {
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

const migrateServers =
  (migrateServer: (server: Readonly<Record<string, unknown>>) => Record<string, unknown>): Migration =>
  (data) => {
    if (!isJsonObject(data.servers)) {
      return { ...data };
    }
    const servers = Object.entries(data.servers).map(([name, server]) => [
      name,
      isJsonObject(server) ? migrateServer(server) : server,
    ]);
    return { ...data, servers: Object.fromEntries(servers) };
  };

/** One entry per version bump, in order; the version of the config file is the list length plus one. */
export const CONFIG_MIGRATIONS: readonly Migration[] = [migrateServers(moveSecretsUnderHost)];

export const CONFIG_VERSION = CONFIG_MIGRATIONS.length + 1;
