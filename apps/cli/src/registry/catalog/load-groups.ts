import type { RegistryContext } from "../types/registry-context";
import type { RegistryServer } from "../types/registry-server";
import { readManifestFile } from "./read-manifest-file";
import { retryWithFreshIndex } from "./retry-with-fresh-index";

/** The group names of a server split into parts, read from its shell alone; empty when its tools are in one manifest. */
export const loadGroups = (server: RegistryServer, context: RegistryContext) =>
  retryWithFreshIndex(server, context, async (current) => {
    const file = await readManifestFile(current, context);
    return "manifest" in file ? [] : file.parts.map((part) => part.name);
  });
