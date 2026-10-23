import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesGetGroupsDeployTokens = defineTool({
  name: "projects:deploy_resources:get_groups_deploy_tokens",
  description:
    "Retrieve a group deploy token. Get a single group's deploy token by ID. This feature was introduced in GitLab 14.9.",
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
    method: "GET",
    path: "/groups/{id}/deploy_tokens/{token_id}",
  },
});
