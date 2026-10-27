import { defineTool } from "@usemcpkit/core";

export const applicationsEntitlementsGetEntitlements = defineTool({
  name: "applications:entitlements:get_entitlements",
  description: "",
  input: {
    type: "object",
    properties: {
      application_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
      sku_ids: {},
      guild_id: {
        type: "string",
      },
      before: {
        type: "string",
      },
      after: {
        type: "string",
      },
      limit: {
        type: "integer",
      },
      exclude_ended: {
        type: "boolean",
      },
      exclude_deleted: {
        type: "boolean",
      },
      only_active: {
        type: "boolean",
      },
    },
    required: ["application_id"],
  },
  request: {
    method: "GET",
    path: "/applications/{application_id}/entitlements",
    query: [
      "user_id",
      "sku_ids",
      "guild_id",
      "before",
      "after",
      "limit",
      "exclude_ended",
      "exclude_deleted",
      "only_active",
    ],
  },
});
