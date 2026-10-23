import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesDeleteGroupsDeployTokens = defineTool({
  name: "projects:deploy_resources:delete_groups_deploy_tokens",
  description: "Delete a group deploy token. Deletes a group deploy token.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      token_id: {
        type: "integer",
        description: "ID of the deploy token.",
      },
    },
    required: ["id", "token_id"],
  },
  request: {
    method: "DELETE",
    path: "/groups/{id}/deploy_tokens/{token_id}",
  },
});
