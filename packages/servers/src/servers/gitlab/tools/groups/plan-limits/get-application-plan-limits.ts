import { defineTool } from "@usemcpkit/core";

export const groupsPlanLimitsGetApplicationPlanLimits = defineTool({
  name: "groups:plan_limits:get_application_plan_limits",
  description: "Get current plan limits. List the current limits of a plan on the GitLab instance.",
  input: {
    type: "object",
    properties: {
      plan_name: {
        type: "string",
        default: "default",
        enum: [
          "default",
          "free",
          "bronze",
          "silver",
          "premium",
          "gold",
          "ultimate",
          "ultimate_trial",
          "ultimate_trial_paid_customer",
          "premium_trial",
          "opensource",
        ],
        description: "Name of the plan to get the limits from.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/application/plan_limits",
    query: ["plan_name"],
  },
});
