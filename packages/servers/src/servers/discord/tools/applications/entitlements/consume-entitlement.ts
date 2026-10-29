import { defineTool } from "@usemcpkit/core";

export const applicationsEntitlementsConsumeEntitlement = defineTool({
  name: "applications:entitlements:consume_entitlement",
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
    method: "POST",
    path: "/applications/{application_id}/entitlements/{entitlement_id}/consume",
  },
});
