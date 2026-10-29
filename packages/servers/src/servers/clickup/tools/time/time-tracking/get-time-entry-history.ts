import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingGetTimeEntryHistory = defineTool({
  name: "time:time_tracking:get_time_entry_history",
  description: "Get time entry history. View a list of changes made to a time entry.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
      timer_id: {
        type: "string",
        description:
          "The ID of a time entry. \\ \\ This can be found using the Get Time Entries Within a Date Range endpoint.",
      },
    },
    required: ["team_id", "timer_id"],
  },
  request: {
    method: "GET",
    path: "/v2/team/{team_id}/time_entries/{timer_id}/history",
  },
});
