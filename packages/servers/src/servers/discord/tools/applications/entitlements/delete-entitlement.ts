import { defineTool } from "@usemcpkit/core";

export const applicationsEntitlementsDeleteEntitlement = defineTool({
  name: "applications:entitlements:delete_entitlement",
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
    method: "DELETE",
    path: "/applications/{application_id}/entitlements/{entitlement_id}",
  },
});
