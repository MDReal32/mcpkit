import { defineTool } from "@usemcpkit/core";

export const actionsActionsReRunJobForWorkflowRun = defineTool({
  name: "actions:actions:re_run_job_for_workflow_run",
  description: "Re-run a job from a workflow run. Re-run a job and its dependent jobs in a workflow run.",
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
      job_id: {
        type: "integer",
        description: "The unique identifier of the job.",
      },
      enable_debug_logging: {
        type: "boolean",
        description: "Whether to enable debug logging for the re-run.",
        default: false,
      },
      enable_debugger: {
        type: "boolean",
        description: "Whether to enable the debugger for the re-run of this job.",
        default: false,
      },
    },
    required: ["owner", "repo", "job_id"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/actions/jobs/{job_id}/rerun",
    body: ["enable_debug_logging", "enable_debugger"],
  },
});
