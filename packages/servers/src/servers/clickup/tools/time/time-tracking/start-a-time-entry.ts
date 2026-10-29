import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingStartATimeEntry = defineTool({
  name: "time:time_tracking:start_a_time_entry",
  description: "Start a time Entry. Start a timer for the authenticated user.",
  input: {
    type: "object",
    properties: {
      team_Id: {
        type: "number",
        description: "Workspace ID",
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
      description: {
        type: "string",
      },
      tags: {
        type: "array",
        description: "Unlimited uses of time entry tags are available on the Business Plus and Enterprise Plan.",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
          required: ["name"],
        },
      },
      tid: {
        type: "string",
        description:
          "You can provide a task ID to associate the time entry with a task. Unlimited uses of time entries that are not associated with tasks are available on the Business Plus and Enterprise Plan.",
      },
      billable: {
        type: "boolean",
      },
    },
    required: ["team_Id"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_Id}/time_entries/start",
    query: ["custom_task_ids", "team_id"],
    body: ["description", "tags", "tid", "billable"],
  },
});
