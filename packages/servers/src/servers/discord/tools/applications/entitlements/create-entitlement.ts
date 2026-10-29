import { defineTool } from "@usemcpkit/core";

export const applicationsEntitlementsCreateEntitlement = defineTool({
  name: "applications:entitlements:create_entitlement",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      sku_id: {
        type: "string",
      },
      owner_id: {
        type: "string",
      },
      owner_type: {
        type: "integer",
      },
    },
    required: ["application_id", "sku_id", "owner_id", "owner_type"],
  },
  request: {
    method: "POST",
    path: "/applications/{application_id}/entitlements",
    body: ["sku_id", "owner_id", "owner_type"],
  },
});
