import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingUpdateATimeEntry = defineTool({
  name: "time:time_tracking:update_a_time_entry",
  description: "Update a time Entry. Update the details of a time entry.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      timer_id: {
        type: "number",
      },
      custom_task_ids: {
        type: "boolean",
        description: "If you want to reference a task by it's custom task id, this value must be `true`.",
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
      tag_action: {
        type: "string",
        description: "Tag actions are `replace`, `add`, and `remove`. You can perform one tag action per request.",
      },
      start: {
        type: "integer",
        description: "When providing `start`, you must also provide `end`.",
      },
      end: {
        type: "integer",
        description: "When providing `end`, you must also provide `start`.",
      },
      tid: {
        type: "string",
        description:
          "You can provide a task ID to associate the time entry with a task. Unlimited uses of time entries that are not associated with tasks are available on the Business Plus and Enterprise Plan.",
      },
      billable: {
        type: "boolean",
      },
      duration: {
        type: "integer",
      },
    },
    required: ["team_id", "timer_id", "tags"],
  },
  request: {
    method: "PUT",
    path: "/v2/team/{team_id}/time_entries/{timer_id}",
    query: ["custom_task_ids"],
    body: ["description", "tags", "tag_action", "start", "end", "tid", "billable", "duration"],
  },
});
