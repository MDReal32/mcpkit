import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingCreateATimeEntry = defineTool({
  name: "time:time_tracking:create_a_time_entry",
  description:
    "Create a time entry. Create a time entry. \\ \\ ***Note:** A time entry that has a negative duration means that timer is currently running for that user.*",
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
            tag_fg: {
              type: "string",
            },
            tag_bg: {
              type: "string",
            },
          },
          required: ["name", "tag_fg", "tag_bg"],
        },
      },
      start: {
        type: "integer",
      },
      stop: {
        type: "integer",
        description: "The `duration` parameter can be used instead of the `stop` parameter.",
      },
      end: {
        type: "integer",
      },
      billable: {
        type: "boolean",
      },
      duration: {
        type: "integer",
        description:
          "When there are values for both `start` and `end`, `duration` is ignored. The `stop` parameter can be used instead of the `duration` parameter.",
      },
      assignee: {
        type: "integer",
        description:
          "Workspace owners and admins can include any user id. Workspace members can only include their own user id. Unlimited uses of creating time entries for other people is available on the Business Plus and Enterprise Plan.",
      },
      tid: {
        type: "string",
        description:
          "You can provide a task ID to associate the time entry with a task. Unlimited uses of time entries that are not associated with tasks are available on the Business Plus and Enterprise Plan.",
      },
    },
    required: ["team_Id", "start", "duration"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_Id}/time_entries",
    query: ["custom_task_ids", "team_id"],
    body: ["description", "tags", "start", "stop", "end", "billable", "duration", "assignee", "tid"],
  },
});
