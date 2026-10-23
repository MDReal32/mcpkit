import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesGetProjectsDeployTokens = defineTool({
  name: "projects:deploy_resources:get_projects_deploy_tokens",
  description: "Retrieve a project deploy token. Retrieves a project deploy token.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      token_id: {
        type: "integer",
        description: "ID of the deploy token.",
      },
    },
    required: ["id", "token_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/deploy_tokens/{token_id}",
  },
});
