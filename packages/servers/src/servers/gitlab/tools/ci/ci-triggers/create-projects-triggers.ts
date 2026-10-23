import { defineTool } from "@usemcpkit/core";

export const ciCiTriggersCreateProjectsTriggers = defineTool({
  name: "ci:ci_triggers:create_projects_triggers",
  description: "Create a trigger token. Creates a pipeline trigger token for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      description: {
        type: "string",
        description: "Description of the trigger token.",
      },
      expires_at: {
        type: "string",
        description: "Timestamp of when the pipeline trigger token expires.",
      },
    },
    required: ["id", "description"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/triggers",
    body: ["description", "expires_at"],
  },
});
