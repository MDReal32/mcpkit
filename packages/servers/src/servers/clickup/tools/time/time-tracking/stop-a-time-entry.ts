import { defineTool } from "@usemcpkit/core";

export const timeTimeTrackingStopATimeEntry = defineTool({
  name: "time:time_tracking:stop_a_time_entry",
  description: "Stop a time Entry. Stop a timer that's currently running for the authenticated user.",
  input: {
    type: "object",
    properties: {
      team_id: {
        type: "number",
        description: "Workspace ID",
      },
    },
    required: ["team_id"],
  },
  request: {
    method: "POST",
    path: "/v2/team/{team_id}/time_entries/stop",
  },
});
