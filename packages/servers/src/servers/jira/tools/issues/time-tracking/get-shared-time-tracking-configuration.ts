import { defineTool } from "@usemcpkit/core";

export const issuesTimeTrackingGetSharedTimeTrackingConfiguration = defineTool({
  name: "issues:time_tracking:get_shared_time_tracking_configuration",
  description:
    "Get time tracking settings. Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see Configuring time tracking.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/configuration/timetracking/options",
  },
});
