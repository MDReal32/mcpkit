import { defineTool } from "@usemcpkit/core";

export const appsAppDataPoliciesGetPolicy = defineTool({
  name: "apps:app_data_policies:get_policy",
  description: "Get data policy for the workspace. Returns data policy for the workspace.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/data-policy",
  },
});
