import { defineTool } from "@usemcpkit/core";

export const groupsGitlabSubscriptionsUpdateNamespacesGitlabSubscription = defineTool({
  name: "groups:gitlab_subscriptions:update_namespaces_gitlab_subscription",
  description: "[Deprecated] Update the subscription for the namespace. Deprecated in GitLab 17.7",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the namespace.",
      },
      start_date: {
        type: "string",
        description: "Start date of the subscription.",
      },
      end_date: {
        type: "string",
        description: "End date of the subscription.",
      },
      plan_code: {
        type: "string",
        description: "Subscription tier code.",
      },
      seats: {
        type: "integer",
        description: "Number of seats in the subscription.",
      },
      max_seats_used: {
        type: "integer",
        description: "Highest number of active users in the last month.",
      },
      auto_renew: {
        type: "boolean",
        description: "If `true`, the subscription automatically renews on its end date.",
      },
      trial: {
        type: "boolean",
        description: "If `true`, the subscription is a trial.",
      },
      trial_ends_on: {
        type: "string",
        description: "End date of the trial.",
      },
      trial_starts_on: {
        type: "string",
        description: "Start date of the trial.",
      },
      trial_extension_type: {
        type: "integer",
        description: "Type of trial extension. `1` means the trial was extended, and `2` means it was reactivated.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/namespaces/{id}/gitlab_subscription",
    body: [
      "start_date",
      "end_date",
      "plan_code",
      "seats",
      "max_seats_used",
      "auto_renew",
      "trial",
      "trial_ends_on",
      "trial_starts_on",
      "trial_extension_type",
    ],
  },
});
