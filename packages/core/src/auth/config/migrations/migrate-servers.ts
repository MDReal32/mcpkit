import { isJsonObject } from "../../../json";
import type { Migration } from "../../../migrations";

export const migrateServers =
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
