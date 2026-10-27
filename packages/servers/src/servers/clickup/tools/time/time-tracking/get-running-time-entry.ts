import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingGetRunningTimeEntry = defineTool({
  name: "time:time_tracking:get_running_time_entry",
  description:
    "Get running time entry. View a time entry that's currently tracking time for the authenticated user. \\ \\ ***Note:** A time entry that has a negative duration means that timer is currently running for that user.*",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      assignee: {
        type: "number",
        description: "user id",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/time_entries/current",
    query: ["assignee"],
  },
});
