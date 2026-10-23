import { join } from "node:path";
import { parseServerId } from "./parse-server-id";

/** The id pattern admits no separators or dots, so the result cannot leave `dir`. */
export const resolveManifestPath = (dir: string, id: string) => {
  const parsed = parseServerId(id);
  if (!parsed) {
    throw new Error(`invalid server id: ${id}`);
  }
  return join(dir, parsed.category, `${parsed.name}.json`);
};
