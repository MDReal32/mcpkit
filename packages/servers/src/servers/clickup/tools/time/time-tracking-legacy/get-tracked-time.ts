import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingLegacyGetTrackedTime = defineTool({
  name: "time:time_tracking_legacy:get_tracked_time",
  description:
    "Get tracked time. ***Note:** This is a legacy time tracking endpoint. We recommend using the Time Tracking API endpoints to manage time entries.*",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by it's custom task id, this value must be `true`.",
      },
      team_id: {
        type: "number",
        description:
          "When the `custom_task_ids` parameter is set to `true`, the Workspace ID must be provided using the `team_id` parameter. \\ For example: `custom_task_ids=true&team_id=123`.",
      },
    },
    required: ["task_id"],
  },
  request: {
    method: "GET",
    path: "/v2/task/{task_id}/time",
    query: ["custom_task_ids", "team_id"],
  },
});
