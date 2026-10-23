import { defineTool } from "@usemcpkit/core";

export const appsCodespacesDeleteSecretForAuthenticatedUser = defineTool({
  name: "apps:codespaces:delete_secret_for_authenticated_user",
  description:
    "Delete a secret for the authenticated user. Deletes a development environment secret from a user's codespaces using the secret name. Deleting the secret will remove access from all codespaces that were allowed to access the secret.",
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
    method: "DELETE",
    path: "/user/codespaces/secrets/{secret_name}",
  },
});
