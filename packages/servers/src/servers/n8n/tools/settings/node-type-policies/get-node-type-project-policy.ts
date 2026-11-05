import { defineTool } from "@usemcpkit/core";

export const settingsNodeTypePoliciesGetNodeTypeProjectPolicy = defineTool({
  name: "settings:node_type_policies:get_node_type_project_policy",
  description:
    "Preview: Retrieve a project's node type policy. **Preview** — breaking changes may still occur without major version bump.",
  input: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
    },
    required: ["projectId"],
  },
  request: {
    method: "GET",
    path: "/node-type-policies/projects/{projectId}",
  },
});
