import { defineTool } from "@usemcpkit/core";

export const hierarchyTemplatesGetTaskTemplates = defineTool({
  name: "hierarchy:templates:get_task_templates",
  description: "Get Task Templates. View the task templates available in a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      page: {
        type: "integer",
      },
    },
    required: ["team_id", "page"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/taskTemplate",
    query: ["page"],
  },
});
