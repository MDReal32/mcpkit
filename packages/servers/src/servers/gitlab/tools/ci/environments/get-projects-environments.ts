import { defineTool } from "@usemcpkit/core";

export const ciEnvironmentsGetProjectsEnvironments = defineTool({
  name: "ci:environments:get_projects_environments",
  description: "Retrieve an environment. Retrieves a specified environment for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      environment_id: {
        type: "integer",
        description: "ID of the environment.",
      },
    },
    required: ["id", "environment_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/environments/{environment_id}",
  },
});
