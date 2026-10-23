import { defineTool } from "@usemcpkit/core";

export const groupsAddOnPurchasesGetNamespacesSubscriptionAddOnPurchase = defineTool({
  name: "groups:add_on_purchases:get_namespaces_subscription_add_on_purchase",
  description: "[Deprecated] Returns an add-on purchase for the namespace. Deprecated in GitLab 17.7",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the namespace.",
      },
      add_on_name: {
        type: "string",
        description: "Name of the add-on.",
      },
    },
    required: ["id", "add_on_name"],
  },
  request: {
    method: "GET",
    path: "/namespaces/{id}/subscription_add_on_purchase/{add_on_name}",
  },
});
