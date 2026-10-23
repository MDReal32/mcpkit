import { defineTool } from "@usemcpkit/core";

export const administrationLicenseMetricsGetLicense = defineTool({
  name: "administration:license_metrics:get_license",
  description: "Get license. Returns licensing information about the Jira instance.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/instance/license",
  },
});
