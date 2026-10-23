import { defineTool } from "@usemcpkit/core";

export const projectsPushRulesDeleteProjectsPushRule = defineTool({
  name: "projects:push_rules:delete_projects_push_rule",
  description: "Delete the push rules of a project. Deletes all the push rules of a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/push_rule",
  },
});
