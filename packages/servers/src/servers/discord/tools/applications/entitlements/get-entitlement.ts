import { defineTool } from "@usemcpkit/core";

export const applicationsEntitlementsGetEntitlement = defineTool({
  name: "applications:entitlements:get_entitlement",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      entitlement_id: {
        type: "string",
      },
    },
    required: ["application_id", "entitlement_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/entitlements/{entitlement_id}",
  },
});
