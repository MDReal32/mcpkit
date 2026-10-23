import { defineTool } from "@usemcpkit/core";

export const appsCodespacesGetSecretForAuthenticatedUser = defineTool({
  name: "apps:codespaces:get_secret_for_authenticated_user",
  description:
    "Get a secret for the authenticated user. Gets a development environment secret available to a user's codespaces without revealing its encrypted value.",
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
    path: "/user/codespaces/secrets/{secret_name}",
  },
});
