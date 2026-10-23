import { defineTool } from "@usemcpkit/core";

export const reposReposGetCommit = defineTool({
  name: "repos:repos:get_commit",
  description:
    "Get a commit. Returns the contents of a single commit reference. You must have `read` access for the repository to use this endpoint.",
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
      ref: {
        type: "string",
        description:
          'The commit reference. Can be a commit SHA, branch name (`heads/BRANCH_NAME`), or tag name (`tags/TAG_NAME`). For more information, see "Git References" in the Git documentation.',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["owner", "repo", "ref"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/commits/{ref}",
    query: ["page", "per_page"],
  },
});
