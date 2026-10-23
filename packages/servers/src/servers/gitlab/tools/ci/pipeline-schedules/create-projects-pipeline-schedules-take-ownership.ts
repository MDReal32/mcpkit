import { defineTool } from "@usemcpkit/core";

export const ciPipelineSchedulesCreateProjectsPipelineSchedulesTakeOwnership = defineTool({
  name: "ci:pipeline_schedules:create_projects_pipeline_schedules_take_ownership",
  description:
    "Create or update ownership of a pipeline schedule. Creates or updates the owner of a pipeline schedule for a project.",
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
    method: "POST",
    path: "/projects/{id}/pipeline_schedules/{pipeline_schedule_id}/take_ownership",
  },
});
