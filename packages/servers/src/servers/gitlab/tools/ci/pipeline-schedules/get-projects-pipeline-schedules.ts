import { defineTool } from "@usemcpkit/core";

export const ciPipelineSchedulesGetProjectsPipelineSchedules = defineTool({
  name: "ci:pipeline_schedules:get_projects_pipeline_schedules",
  description: "Retrieve a pipeline schedule. Retrieves a pipeline schedule for a project.",
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
    },
    required: ["id", "pipeline_schedule_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/pipeline_schedules/{pipeline_schedule_id}",
  },
});
