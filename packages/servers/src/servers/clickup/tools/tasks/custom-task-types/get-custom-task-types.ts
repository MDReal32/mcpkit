import { defineTool } from "@usemcpkit/core";

export const tasksCustomTaskTypesGetCustomTaskTypes = defineTool({
  name: "tasks:custom_task_types:get_custom_task_types",
  description: "Get Custom Task Types. View the custom task types available in a Workspace.",
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
    path: "/v2/team/{team_id}/custom_item",
  },
});
