import { defineTool } from "@usemcpkit/core";

export const appsAppsListSubscriptionsForAuthenticatedUser = defineTool({
  name: "apps:apps:list_subscriptions_for_authenticated_user",
  description:
    "List subscriptions for the authenticated user. Lists the active subscriptions for the authenticated user.",
  input: {
    type: "object",
    properties: {
      per_page: {
        type: "integer",
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: "integer",
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
    },
  },
  request: {
    method: "GET",
    path: "/user/marketplace_purchases",
    query: ["per_page", "page"],
  },
});
