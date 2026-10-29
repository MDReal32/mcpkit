import { TOOL_NAME_SEPARATOR } from "../const";
import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { loadGroupManifest } from "./load-group-manifest";

/** The manifest holding `tool`: the part of its group for a server split into parts, the whole manifest otherwise. */
export const loadManifest = (server: RegistryServer, context: RegistryContext, tool: string) => {
  const [group = ""] = tool.split(TOOL_NAME_SEPARATOR);
  return loadGroupManifest(server, context, group);
};
