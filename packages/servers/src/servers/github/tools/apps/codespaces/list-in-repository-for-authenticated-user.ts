import { defineTool } from "@usemcpkit/core";

export const appsCodespacesListInRepositoryForAuthenticatedUser = defineTool({
  name: "apps:codespaces:list_in_repository_for_authenticated_user",
  description:
    "List codespaces in a repository for the authenticated user. Lists the codespaces associated to a specified repository and the authenticated user.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
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
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/codespaces",
    query: ["per_page", "page"],
  },
});
