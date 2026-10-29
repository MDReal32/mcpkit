import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingDeleteATimeEntry = defineTool({
  name: "time:time_tracking:delete_a_time_entry",
  description: "Delete a time Entry. Delete a time entry from a Workspace.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      timer_id: {
        type: "number",
        description: "Array of timer ids to delete separated by commas",
      },
    },
    required: ["team_id", "timer_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/team/{team_id}/time_entries/{timer_id}",
  },
});
