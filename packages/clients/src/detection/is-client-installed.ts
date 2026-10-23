import { pathExists } from "../paths/path-exists";
import type { ClientContext } from "../types/client-context";
import type { ClientDefinition } from "../types/client-definition";

export const isClientInstalled = async (definition: ClientDefinition, context: ClientContext) => {
  const found = await Promise.all(definition.detectPaths(context).map(pathExists));
  return found.includes(true);
};
