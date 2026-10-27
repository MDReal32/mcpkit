import type { MetaTool } from "../types/meta-tool";
import type { ToolRow } from "./tool-row";

export const createRowToolDefinition = ({ name, description }: ToolRow) =>
  ({
    name,
    description,
    inputSchema: {
      type: "object",
      properties: {
        tool: { type: "string", description: 'The "<resource>:<action>" of the tool, as listed by list_tools.' },
        arguments: { type: "object", description: "Arguments matching the schema from describe_tool." },
      },
      required: ["tool"],
    },
  }) satisfies MetaTool;
