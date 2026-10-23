import { defineTool } from "@usemcpkit/core";

export const reposReposListActivities = defineTool({
  name: "repos:repos:list_activities",
  description:
    "List repository activities. Lists a detailed history of changes to a repository, such as pushes, merges, force pushes, and branch changes, and associates these changes with commits and users.",
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
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
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
      ref: {
        type: "string",
        description: "The Git reference for the activities you want to list.",
      },
      actor: {
        type: "string",
        description: "The GitHub username to use to filter by the actor who performed the activity.",
      },
      time_period: {
        type: "string",
        enum: ["day", "week", "month", "quarter", "year"],
        description: "The time period to filter by.",
      },
      activity_type: {
        type: "string",
        enum: ["push", "force_push", "branch_creation", "branch_deletion", "pr_merge", "merge_queue_merge"],
        description: "The activity type to filter by.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/activity",
    query: ["direction", "per_page", "before", "after", "ref", "actor", "time_period", "activity_type"],
  },
});
