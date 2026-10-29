import { isJsonObject } from "../../../json";
import type { Migration } from "../../../migrations";

export const groupServers =
  (toGroup: (name: string) => string): Migration =>
  (data) => {
    if (!isJsonObject(data.servers)) {
      return { ...data };
    }
    const grouped: Record<string, Record<string, unknown>> = {};
    for (const [name, server] of Object.entries(data.servers)) {
      const group = toGroup(name);
      grouped[group] = { ...grouped[group], [name]: server };
    }
    return { ...data, servers: grouped };
  };
