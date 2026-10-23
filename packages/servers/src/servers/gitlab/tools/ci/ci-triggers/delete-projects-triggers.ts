import { defineTool } from "@usemcpkit/core";

export const ciCiTriggersDeleteProjectsTriggers = defineTool({
  name: "ci:ci_triggers:delete_projects_triggers",
  description: "Delete a pipeline trigger token. Deletes a pipeline trigger token for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      trigger_id: {
        type: "integer",
        description: "ID of the trigger token.",
      },
    },
    required: ["id", "trigger_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/triggers/{trigger_id}",
  },
});
