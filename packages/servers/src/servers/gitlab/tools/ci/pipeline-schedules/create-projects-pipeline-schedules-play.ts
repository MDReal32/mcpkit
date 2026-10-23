import { defineTool } from "@usemcpkit/core";

export const ciPipelineSchedulesCreateProjectsPipelineSchedulesPlay = defineTool({
  name: "ci:pipeline_schedules:create_projects_pipeline_schedules_play",
  description:
    "Run a pipeline schedule. Runs a pipeline schedule immediately. The next scheduled run of this pipeline is not affected.",
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
    path: "/projects/{id}/pipeline_schedules/{pipeline_schedule_id}/play",
  },
});
