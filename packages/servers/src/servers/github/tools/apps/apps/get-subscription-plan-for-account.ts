import { defineTool } from "@usemcpkit/core";

export const appsAppsGetSubscriptionPlanForAccount = defineTool({
  name: "apps:apps:get_subscription_plan_for_account",
  description:
    "Get a subscription plan for an account. Shows whether the user or organization account actively subscribes to a plan listed by the authenticated GitHub App. When someone submits a plan change that won't be processed until the end of their billing cycle, you will also see the upcoming pending change.",
  input: {
    type: "object",
    properties: {
      account_id: {
        type: "integer",
        description: "account_id parameter",
      },
    },
    required: ["account_id"],
  },
  request: {
    method: "GET",
    path: "/marketplace_listing/accounts/{account_id}",
  },
});
