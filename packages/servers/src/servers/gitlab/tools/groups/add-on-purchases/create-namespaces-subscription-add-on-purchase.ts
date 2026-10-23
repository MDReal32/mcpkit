import { defineTool } from "@usemcpkit/core";

export const groupsAddOnPurchasesCreateNamespacesSubscriptionAddOnPurchase = defineTool({
  name: "groups:add_on_purchases:create_namespaces_subscription_add_on_purchase",
  description: "[Deprecated] Create an add-on purchase for the namespace. Deprecated in GitLab 17.7",
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
      quantity: {
        type: "integer",
        description: "Quantity of the purchase.",
      },
      started_on: {
        type: "string",
        description: "Date when the purchase takes effect.",
      },
      expires_on: {
        type: "string",
        description: "Date when the purchase expires.",
      },
      purchase_xid: {
        type: "string",
        description: "Identifier of the purchase, for example the subscription name.",
      },
      trial: {
        type: "boolean",
        description: "If `true`, the add-on purchase is a trial.",
        default: false,
      },
    },
    required: ["id", "add_on_name", "quantity", "started_on", "expires_on", "purchase_xid"],
  },
  request: {
    method: "POST",
    path: "/namespaces/{id}/subscription_add_on_purchase/{add_on_name}",
    body: ["quantity", "started_on", "expires_on", "purchase_xid", "trial"],
  },
});
