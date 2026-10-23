import { toToolNames } from "../../utils/naming/to-tool-names";
import { slugify } from "./slugify";
import { toActionName } from "./to-action-name";
import type { GitlabOperation } from "./types/gitlab-operation";

/**
 * Names tools `<group>:<tag>:<verb>_<path words>`. When two operations of one tag collapse to the
 * same action, the later one gets its HTTP method and then a counter appended.
 */
export const createNameAllocator = () => {
  const taken = new Set<string>();
  return (group: string, operation: GitlabOperation) => {
    const resourceFolder = slugify(operation.category);
    const base = toActionName(operation);
    const candidates = [base, `${base}-${operation.method}`];
    let actionFile = candidates.find((candidate) => !taken.has(`${group}/${resourceFolder}/${candidate}`));
    for (let counter = 2; actionFile === undefined; counter += 1) {
      const candidate = `${base}-${operation.method}-${counter}`;
      actionFile = taken.has(`${group}/${resourceFolder}/${candidate}`) ? undefined : candidate;
    }
    taken.add(`${group}/${resourceFolder}/${actionFile}`);
    return toToolNames(group, resourceFolder, actionFile);
  };
};
