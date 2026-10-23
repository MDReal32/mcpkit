import { defineTool } from "@usemcpkit/core";

export const ciPipelineSchedulesListProjectsPipelineSchedulesPipelines = defineTool({
  name: "ci:pipeline_schedules:list_projects_pipeline_schedules_pipelines",
  description:
    "List all pipelines triggered by a pipeline schedule. Lists all pipelines triggered by a pipeline schedule in a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      pipeline_schedule_id: {
        type: "integer",
        description: "ID of the pipeline schedule.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
      scope: {
        type: "string",
        enum: ["running", "pending", "finished", "branches", "tags"],
        description: "Return pipelines in the specified scope.",
      },
      status: {
        type: "string",
        enum: [
          "created",
          "waiting_for_resource",
          "preparing",
          "waiting_for_callback",
          "pending",
          "running",
          "success",
          "failed",
          "canceling",
          "canceled",
          "skipped",
          "manual",
          "scheduled",
        ],
        description: "Return pipelines with the specified status.",
      },
      updated_before: {
        type: "string",
        description: "Return pipelines updated on or before the specified time.",
      },
      updated_after: {
        type: "string",
        description: "Return pipelines updated on or after the specified time.",
      },
      created_before: {
        type: "string",
        description: "Return pipelines created before the specified time.",
      },
      created_after: {
        type: "string",
        description: "Return pipelines created after the specified time.",
      },
      sort: {
        type: "string",
        default: "asc",
        enum: ["asc", "desc"],
        description: "Sort results in ascending or descending order.",
      },
    },
    required: ["id", "pipeline_schedule_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/pipeline_schedules/{pipeline_schedule_id}/pipelines",
    query: [
      "page",
      "per_page",
      "scope",
      "status",
      "updated_before",
      "updated_after",
      "created_before",
      "created_after",
      "sort",
    ],
  },
});
