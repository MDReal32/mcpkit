import type { JsonSchema } from "@usemcpkit/core";
import type { FinalizedTools } from "../../utils/types/finalized-tools";
import type { ToolDefinition } from "../../utils/types/tool-definition";
import { CLOUD_EDITION, CLOUD_ONLY_SUFFIX, DATA_CENTER_ONLY_SUFFIX, DATA_CENTER_REQUEST_OVERRIDES } from "./const";
import type { DataCenterRequestOverride } from "./types/data-center-request-override";

const annotate = (schema: JsonSchema, suffix: string) => ({
  ...schema,
  description: schema.description ? `${schema.description} ${suffix}` : suffix,
});

const overrideDefinition = (definition: ToolDefinition, override: DataCenterRequestOverride) => {
  const properties: Record<string, JsonSchema> = {};
  for (const [name, schema] of Object.entries(definition.input.properties ?? {})) {
    properties[name] = override.cloudOnlyArguments.includes(name) ? annotate(schema, CLOUD_ONLY_SUFFIX) : schema;
  }
  for (const [name, schema] of Object.entries(override.properties)) {
    properties[name] = annotate(schema, DATA_CENTER_ONLY_SUFFIX);
  }
  const required = [...(definition.input.required ?? []), ...override.required];
  const overridden: ToolDefinition = {
    ...definition,
    input: { type: "object", properties, required },
    request: override.request,
    editions: { ...definition.editions, [CLOUD_EDITION]: { request: definition.request } },
  };
  return overridden;
};

/**
 * Jira Cloud serves some downloads from a REST endpoint that Data Center does not have; Data Center serves them from
 * a servlet. The spec only describes the Cloud endpoint, so the Data Center request is written by hand and becomes the
 * default of the tool, with the spec's request as its `cloud` edition.
 */
export const applyDataCenterOverrides = (finalized: FinalizedTools) => {
  const notes = [...finalized.notes];
  const tools = finalized.tools.map((tool) => {
    const override = DATA_CENTER_REQUEST_OVERRIDES.find((candidate) => candidate.tool === tool.definition.name);
    if (!override) {
      return tool;
    }
    notes.push(
      `${override.tool}: Data Center request ${override.request.path} is the default, the spec's is \`cloud\``,
    );
    return { ...tool, definition: overrideDefinition(tool.definition, override) };
  });
  const missing = DATA_CENTER_REQUEST_OVERRIDES.filter(
    (override) => !finalized.tools.some((tool) => tool.definition.name === override.tool),
  );
  if (missing.length > 0) {
    throw new Error(`Data Center override for ${missing.map((override) => override.tool).join(", ")} has no tool`);
  }
  const applied: FinalizedTools = { tools, notes };
  return applied;
};
