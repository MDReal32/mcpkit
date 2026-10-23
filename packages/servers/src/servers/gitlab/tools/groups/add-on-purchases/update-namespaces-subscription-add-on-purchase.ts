import { defineTool } from "@usemcpkit/core";

export const groupsAddOnPurchasesUpdateNamespacesSubscriptionAddOnPurchase = defineTool({
  name: "groups:add_on_purchases:update_namespaces_subscription_add_on_purchase",
  description: "[Deprecated] Update the add-on purchase for the namespace. Deprecated in GitLab 17.7",
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
      started_on: {
        type: "string",
        description: "Date when the purchase takes effect.",
      },
      expires_on: {
        type: "string",
        description: "Date when the purchase expires.",
      },
      quantity: {
        type: "integer",
        description: "Quantity of the purchase.",
      },
      purchase_xid: {
        type: "string",
        description: "Identifier of the purchase, for example the subscription name.",
      },
      trial: {
        type: "boolean",
        description: "If `true`, the add-on purchase is a trial.",
      },
    },
    required: ["id", "add_on_name", "started_on", "expires_on"],
  },
  request: {
    method: "PUT",
    path: "/namespaces/{id}/subscription_add_on_purchase/{add_on_name}",
    body: ["started_on", "expires_on", "quantity", "purchase_xid", "trial"],
  },
});
