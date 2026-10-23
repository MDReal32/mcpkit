import { defineTool } from "@usemcpkit/core";

export const issuesTimeTrackingGetSelectedTimeTrackingImplementation = defineTool({
  name: "issues:time_tracking:get_selected_time_tracking_implementation",
  description:
    "Get selected time tracking provider. Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a successful but empty response is returned.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/configuration/timetracking",
  },
});
