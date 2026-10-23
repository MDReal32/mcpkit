import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesCreateProjectsDeployTokens = defineTool({
  name: "projects:deploy_resources:create_projects_deploy_tokens",
  description: "Create a project deploy token. Creates a project deploy token.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the deploy token.",
      },
      scopes: {
        type: "array",
        description: "Scopes of the deploy token. Must include at least one scope.",
        items: {
          type: "string",
          enum: [
            "read_repository",
            "read_registry",
            "write_registry",
            "read_package_registry",
            "write_package_registry",
            "read_virtual_registry",
            "write_virtual_registry",
          ],
        },
      },
      expires_at: {
        type: "string",
        description: "Date when the deploy token expires. If omitted, the deploy token does not expire.",
      },
      username: {
        type: "string",
        description: "Username for the deploy token. Defaults to `gitlab+deploy-token-{n}`.",
      },
    },
    required: ["id", "name", "scopes"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/deploy_tokens",
    body: ["name", "scopes", "expires_at", "username"],
  },
});
