import { defineTool } from "@usemcpkit/core";

export const reposReposListReleaseAssets = defineTool({
  name: "repos:repos:list_release_assets",
  description: "List release assets",
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
      release_id: {
        type: "integer",
        description: "The unique identifier of the release.",
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
    required: ["owner", "repo", "release_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/releases/{release_id}/assets",
    query: ["per_page", "page"],
  },
});
