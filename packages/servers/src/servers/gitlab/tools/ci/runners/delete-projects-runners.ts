import { defineTool } from "@usemcpkit/core";

export const ciRunnersDeleteProjectsRunners = defineTool({
  name: "ci:runners:delete_projects_runners",
  description:
    "Unassign a runner from a project. Unassigns a specified project runner from a project. You cannot unassign a runner from the owner project. Use the delete a runner operation instead.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      runner_id: {
        type: "integer",
        description: "ID of the runner.",
      },
    },
    required: ["id", "runner_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/runners/{runner_id}",
  },
});
