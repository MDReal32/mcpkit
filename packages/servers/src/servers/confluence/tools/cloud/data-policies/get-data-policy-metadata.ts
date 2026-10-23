import { defineTool } from "@usemcpkit/core";

export const cloudDataPoliciesGetDataPolicyMetadata = defineTool({
  name: "cloud:data_policies:get_data_policy_metadata",
  description: "[Cloud] Get data policy metadata for the workspace. Returns data policy metadata for the workspace.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/data-policies/metadata",
  },
});
