import { join } from "node:path";
import { PART_NAME_PATTERN } from "../const";
import { parseServerId } from "../ids/parse-server-id";

/** `<dir>/<category>/<name>/<part>.json`; both patterns admit no separators or dots, so it cannot leave `dir`. */
export const resolvePartPath = (dir: string, id: string, partName: string) => {
  const parsed = parseServerId(id);
  if (!parsed || !PART_NAME_PATTERN.test(partName)) {
    throw new Error(`invalid manifest part: ${id} ${partName}`);
  }
  return join(dir, parsed.category, parsed.name, `${partName}.json`);
};
