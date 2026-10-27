import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingLegacyEditTimeTracked = defineTool({
  name: "time:time_tracking_legacy:edit_time_tracked",
  description:
    "Edit time tracked. ***Note:** This is a legacy time tracking endpoint. We recommend using the Time Tracking API endpoints to manage time entries.*",
  input: {
    type: "object",
    properties: {
      task_id: {
        type: "string",
      },
      interval_id: {
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
      start: {
        type: "integer",
      },
      end: {
        type: "integer",
      },
      time: {
        type: "integer",
      },
    },
    required: ["task_id", "interval_id", "start", "end", "time"],
  },
  request: {
    method: "PUT",
    path: "/v2/task/{task_id}/time/{interval_id}",
    query: ["custom_task_ids", "team_id"],
    body: ["start", "end", "time"],
  },
});
