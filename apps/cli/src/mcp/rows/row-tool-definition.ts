import type { MetaTool } from "../types/meta-tool";
import { createToolAnnotations } from "./create-tool-annotations";
import type { ToolRow } from "./tool-row";

export const createRowToolDefinition = ({ name, description, verb }: ToolRow) =>
  ({
    name,
    description,
    annotations: createToolAnnotations(verb),
    inputSchema: {
      type: "object",
      properties: {
        tool: { type: "string", description: 'The "<resource>:<action>" of the tool, as listed by list_tools.' },
        arguments: { type: "object", description: "Arguments matching the schema from describe_tool." },
      },
      required: ["tool"],
    },
  }) satisfies MetaTool;
