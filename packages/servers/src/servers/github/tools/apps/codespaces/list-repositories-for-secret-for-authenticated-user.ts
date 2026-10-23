import { defineTool } from "@usemcpkit/core";

export const appsCodespacesListRepositoriesForSecretForAuthenticatedUser = defineTool({
  name: "apps:codespaces:list_repositories_for_secret_for_authenticated_user",
  description:
    "List selected repositories for a user secret. List the repositories that have been granted the ability to use a user's development environment secret.",
  input: {
    type: "object",
    properties: {
      secret_name: {
        type: "string",
        description: "The name of the secret.",
      },
    },
    required: ["secret_name"],
  },
  request: {
    method: "GET",
    path: "/user/codespaces/secrets/{secret_name}/repositories",
  },
});
