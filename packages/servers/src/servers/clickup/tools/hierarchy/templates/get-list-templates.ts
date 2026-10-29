import { defineTool } from "@usemcpkit/core";

export const hierarchyTemplatesGetListTemplates = defineTool({
  name: "hierarchy:templates:get_list_templates",
  description: "Get List Templates. View the List templates available in a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/list_template",
  },
});
