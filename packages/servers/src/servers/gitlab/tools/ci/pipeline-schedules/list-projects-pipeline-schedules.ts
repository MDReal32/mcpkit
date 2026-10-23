import { defineTool } from "@usemcpkit/core";

export const ciPipelineSchedulesListProjectsPipelineSchedules = defineTool({
  name: "ci:pipeline_schedules:list_projects_pipeline_schedules",
  description: "List all pipeline schedules. Lists all pipeline schedules for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
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
        enum: ["active", "inactive"],
        description: "Scope of pipeline schedules.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/pipeline_schedules",
    query: ["page", "per_page", "scope"],
  },
});
