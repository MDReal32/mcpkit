import { defineTool } from "@usemcpkit/core";

export const ciPipelineSchedulesGetProjectsPipelineSchedulesVariables = defineTool({
  name: "ci:pipeline_schedules:get_projects_pipeline_schedules_variables",
  description: "Retrieve a variable for a pipeline schedule. Retrieves a specified variable for a pipeline schedule.",
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
      key: {
        type: "string",
        description:
          "Key of the pipeline schedule variable. Must be 255 characters or fewer and contain only `A-Z`, `a-z`, `0-9`, and `_`.",
      },
    },
    required: ["id", "pipeline_schedule_id", "key"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/pipeline_schedules/{pipeline_schedule_id}/variables/{key}",
  },
});
