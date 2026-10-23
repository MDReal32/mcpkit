import { defineTool } from "@usemcpkit/core";

export const actionsActionsListWorkflowRunsForRepo = defineTool({
  name: "actions:actions:list_workflow_runs_for_repo",
  description:
    "List workflow runs for a repository. Lists all workflow runs for a repository. You can use parameters to narrow the list of results. For more information about using parameters, see Parameters.",
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
      actor: {
        type: "string",
        description:
          "Returns someone's workflow runs. Use the login for the user who created the `push` associated with the check suite or workflow run.",
      },
      branch: {
        type: "string",
        description: "Returns workflow runs associated with a branch. Use the name of the branch of the `push`.",
      },
      event: {
        type: "string",
        description:
          'Returns workflow run triggered by the event you specify. For example, `push`, `pull_request` or `issue`. For more information, see "Events that trigger workflows."',
      },
      status: {
        type: "string",
        enum: [
          "completed",
          "action_required",
          "cancelled",
          "failure",
          "neutral",
          "skipped",
          "stale",
          "success",
          "timed_out",
          "in_progress",
          "queued",
          "requested",
          "waiting",
          "pending",
        ],
        description:
          "Returns workflow runs with the check run `status` or `conclusion` that you specify. For example, a conclusion can be `success` or a status can be `in_progress`. Only GitHub Actions can set a status of `waiting`, `pending`, or `requested`.",
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
      created: {
        type: "string",
        description:
          'Returns workflow runs created within the given date-time range. For more information on the syntax, see "Understanding the search syntax."',
      },
      exclude_pull_requests: {
        type: "boolean",
        default: false,
        description: "If `true` pull requests are omitted from the response (empty array).",
      },
      check_suite_id: {
        type: "integer",
        description: "Returns workflow runs with the `check_suite_id` that you specify.",
      },
      head_sha: {
        type: "string",
        description: "Only returns workflow runs that are associated with the specified `head_sha`.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/actions/runs",
    query: [
      "actor",
      "branch",
      "event",
      "status",
      "per_page",
      "page",
      "created",
      "exclude_pull_requests",
      "check_suite_id",
      "head_sha",
    ],
  },
});
