import { defineTool } from "@usemcpkit/core";

export const actionsActionsListSelfHostedRunnersForRepo = defineTool({
  name: "actions:actions:list_self_hosted_runners_for_repo",
  description: "List self-hosted runners for a repository. Lists all self-hosted runners configured in a repository.",
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
      name: {
        type: "string",
        description: "The name of a self-hosted runner.",
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
    path: "/repos/{owner}/{repo}/actions/runners",
    query: ["name", "per_page", "page"],
  },
});
