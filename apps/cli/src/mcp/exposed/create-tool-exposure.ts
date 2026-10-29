import { createToolAnnotations } from "../annotations/create-tool-annotations";
import { createToolId } from "../tools/create-tool-id";
import type { Catalog } from "../types/catalog";
import type { CatalogServer } from "../types/catalog-server";
import type { McpOptions } from "../types/mcp-options";
import { EMPTY_INPUT_SCHEMA } from "./const";
import { createGroupSectionDescription, createServerSectionDescription } from "./create-section-description";
import { createToolName } from "./create-tool-name";
import { describeOpenedSection } from "./describe-opened-section";
import type { ExposedEntry } from "./exposed-entry";
import type { ExposedSection } from "./exposed-section";
import { loadGroupTools } from "./load-group-tools";
import { readVerb } from "./read-verb";
import { sectionKey } from "./section-key";
import type { ToolExposure } from "./tool-exposure";

const pickFreeName = (serverId: string, tool: string, taken: ReadonlySet<string>) => {
  let attempt = 0;
  let name = createToolName(serverId, tool, attempt);
  while (taken.has(name)) {
    attempt += 1;
    name = createToolName(serverId, tool, attempt);
  }
  return name;
};

/**
 * The tool list starts as one section per server and grows as the model opens them: a server lists its groups, a
 * group (or a server that is not split) puts its tools in the list. Nothing is downloaded until a section is opened,
 * and `onToolsChanged` tells the client to list again after each opening. A server whose section cannot be opened
 * stays closed and says why in the reply, so one broken server never hides the others.
 */
export const createToolExposure = (catalog: Catalog, options: McpOptions) => {
  const taken = new Set<string>();
  const children = new Map<string, readonly ExposedEntry[]>();
  const loading = new Map<string, Promise<readonly ExposedEntry[]>>();

  const createSection = (server: CatalogServer, group?: string) => {
    const name = pickFreeName(server.id, group ?? "", taken);
    taken.add(name);
    const section: ExposedSection = {
      kind: "section",
      name,
      serverId: server.id,
      ...(group === undefined ? {} : { group }),
      description:
        group === undefined ? createServerSectionDescription(server) : createGroupSectionDescription(server, group),
      inputSchema: EMPTY_INPUT_SCHEMA,
      annotations: { readOnlyHint: true },
    };
    return section;
  };

  const roots = catalog.servers.map((server) => createSection(server));

  const loadChildren = async (section: ExposedSection) => {
    const server = catalog.servers.find((candidate) => candidate.id === section.serverId);
    if (!server) {
      throw new Error(`unknown server "${section.serverId}"`);
    }
    const groups =
      section.group === undefined && !catalog.upstreams?.has(server.id) ? await catalog.loadGroups(server.id) : [];
    if (groups.length > 0) {
      return groups.map((group) => createSection(server, group));
    }
    const descriptors = await loadGroupTools(catalog, server, section.group);
    return descriptors.map(({ tool, description, inputSchema }) => {
      const name = pickFreeName(server.id, tool, taken);
      taken.add(name);
      const entry: ExposedEntry = {
        kind: "tool",
        name,
        serverId: server.id,
        tool,
        description,
        inputSchema,
        annotations: createToolAnnotations(readVerb(tool)),
      };
      return entry;
    });
  };

  const expand = (entries: readonly ExposedEntry[]): ExposedEntry[] =>
    entries.flatMap((entry) =>
      entry.kind === "section" ? [entry, ...expand(children.get(sectionKey(entry)) ?? [])] : [entry],
    );

  const list = () => expand(roots);

  const open = async (section: ExposedSection) => {
    const key = sectionKey(section);
    const id = section.group === undefined ? section.serverId : createToolId(section.serverId, section.group);
    const known = children.get(key);
    if (known) {
      return describeOpenedSection(id, known);
    }
    const pending = loading.get(key) ?? loadChildren(section);
    loading.set(key, pending);
    try {
      const opened = await pending;
      if (!children.has(key)) {
        children.set(key, opened);
        options.onToolsChanged?.();
      }
      return describeOpenedSection(id, opened);
    } finally {
      loading.delete(key);
    }
  };

  const exposure: ToolExposure = { list, find: (name) => list().find((entry) => entry.name === name), open };
  return exposure;
};
