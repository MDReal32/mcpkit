import { defineTool } from "@usemcpkit/core";

export const actionsActionsListWorkflowRunArtifacts = defineTool({
  name: "actions:actions:list_workflow_run_artifacts",
  description: "List workflow run artifacts. Lists artifacts for a workflow run.",
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
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      name: {
        type: "string",
        description: "The name field of an artifact. When specified, only artifacts with this name will be returned.",
      },
      direction: {
        type: "string",
        default: "desc",
        enum: ["asc", "desc"],
        description: "The direction to sort the results by.",
      },
    },
    required: ["owner", "repo", "run_id"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/actions/runs/{run_id}/artifacts",
    query: ["per_page", "page", "name", "direction"],
  },
});
