import { defineTool } from "@usemcpkit/core";

export const issuesReactionsListForRelease = defineTool({
  name: "issues:reactions:list_for_release",
  description: "List reactions for a release. List the reactions to a release.",
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
      content: {
        type: "string",
        enum: ["+1", "laugh", "heart", "hooray", "rocket", "eyes"],
        description: "Returns a single reaction type. Omit this parameter to list all reactions to a release.",
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
    path: "/repos/{owner}/{repo}/releases/{release_id}/reactions",
    query: ["content", "per_page", "page"],
  },
});
