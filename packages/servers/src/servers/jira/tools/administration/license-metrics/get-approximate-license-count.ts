import { defineTool } from "@usemcpkit/core";

export const administrationLicenseMetricsGetApproximateLicenseCount = defineTool({
  name: "administration:license_metrics:get_approximate_license_count",
  description:
    "Get approximate license count. Returns the approximate number of user accounts across all Jira licenses. Note that this information is cached with a 7-day lifecycle and could be stale at the time of call.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/license/approximateLicenseCount",
  },
});
