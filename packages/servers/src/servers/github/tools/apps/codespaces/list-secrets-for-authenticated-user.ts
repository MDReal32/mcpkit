import { defineTool } from "@usemcpkit/core";

export const appsCodespacesListSecretsForAuthenticatedUser = defineTool({
  name: "apps:codespaces:list_secrets_for_authenticated_user",
  description:
    "List secrets for the authenticated user. Lists all development environment secrets available for a user's codespaces without revealing their encrypted values.",
  input: {
    type: "object",
    properties: {
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
  },
  request: {
    method: "GET",
    path: "/user/codespaces/secrets",
    query: ["per_page", "page"],
  },
});
