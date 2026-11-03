import { defineTool } from "@usemcpkit/core";

export const usersPaymentsGetPayments = defineTool({
  name: "users:payments:get_payments",
  description:
    "Get payments. There are two methods to query for a user's payment information on a plugin, widget, or Community file. The first method, using plugin payment tokens, is typically used when making queries from a plugin's or widget's code. The second method, providing a user ID and resource ID, is typically used when making queries from anywhere else.",
  input: {
    type: "object",
    properties: {
      plugin_payment_token: {
        type: "string",
        description:
          'Short-lived token returned from "getPluginPaymentTokenAsync" in the plugin payments API and used to authenticate to this endpoint. Read more about generating this token through "Calling the Payments REST API from a plugin or widget" below.',
      },
      user_id: {
        type: "string",
        description:
          "The ID of the user to query payment information about. You can get the user ID by having the user OAuth2 to the Figma REST API.",
      },
      community_file_id: {
        type: "string",
        description:
          'The ID of the Community file to query a user\'s payment information on. You can get the Community file ID from the file\'s Community page (look for the number after "file/" in the URL). Provide exactly one of "community_file_id", "plugin_id", or "widget_id".',
      },
      plugin_id: {
        type: "string",
        description:
          'The ID of the plugin to query a user\'s payment information on. You can get the plugin ID from the plugin\'s manifest, or from the plugin\'s Community page (look for the number after "plugin/" in the URL). Provide exactly one of "community_file_id", "plugin_id", or "widget_id".',
      },
      widget_id: {
        type: "string",
        description:
          'The ID of the widget to query a user\'s payment information on. You can get the widget ID from the widget\'s manifest, or from the widget\'s Community page (look for the number after "widget/" in the URL). Provide exactly one of "community_file_id", "plugin_id", or "widget_id".',
      },
    },
  },
  request: {
    method: "GET",
    path: "/v1/payments",
    query: ["plugin_payment_token", "user_id", "community_file_id", "plugin_id", "widget_id"],
  },
});
