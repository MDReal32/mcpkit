import { defineTool } from "@usemcpkit/core";

export const actionsActionsListConcurrencyGroupsForWorkflowRun = defineTool({
  name: "actions:actions:list_concurrency_groups_for_workflow_run",
  description:
    "List concurrency groups for a workflow run. Lists all concurrency groups associated with a workflow run or its jobs.",
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
      run_id: {
        type: "integer",
        description: "The unique identifier of the workflow run.",
      },
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      before: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor. For more information, see "Using pagination in the REST API."',
      },
      after: {
        type: "string",
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor. For more information, see "Using pagination in the REST API."',
      },
    },
    required: ["owner", "repo", "run_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/actions/runs/{run_id}/concurrency_groups",
    query: ["per_page", "before", "after"],
  },
});
