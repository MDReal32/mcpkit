import { defineTool } from "@usemcpkit/core";

export const ciCiTriggersUpdateProjectsTriggers = defineTool({
  name: "ci:ci_triggers:update_projects_triggers",
  description: "Update a pipeline trigger token. Updates a pipeline trigger token for a project.",
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
      description: {
        type: "string",
        description: "Description of the trigger token.",
      },
    },
    required: ["id", "trigger_id"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/triggers/{trigger_id}",
    body: ["description"],
  },
});
