import { defineTool } from "@usemcpkit/core";

export const appsCodespacesRemoveRepositoryForSecretForAuthenticatedUser = defineTool({
  name: "apps:codespaces:remove_repository_for_secret_for_authenticated_user",
  description:
    "Remove a selected repository from a user secret. Removes a repository from the selected repositories for a user's development environment secret.",
  input: {
    type: "object",
    properties: {
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
      repository_id: {
        type: "integer",
      },
    },
    required: ["secret_name", "repository_id"],
  },
  request: {
    method: "DELETE",
    path: "/user/codespaces/secrets/{secret_name}/repositories/{repository_id}",
  },
});
