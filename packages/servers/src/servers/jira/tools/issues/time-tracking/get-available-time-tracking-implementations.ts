import { defineTool } from "@usemcpkit/core";

export const issuesTimeTrackingGetAvailableTimeTrackingImplementations = defineTool({
  name: "issues:time_tracking:get_available_time_tracking_implementations",
  description:
    "Get all time tracking providers. Returns all time tracking providers. By default, Jira only has one time tracking provider: *JIRA provided time tracking*. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more information on time tracking providers, see the documentation for the Time Tracking Provider module.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/configuration/timetracking/list",
  },
});
