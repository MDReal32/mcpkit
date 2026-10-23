import { defineTool } from "@usemcpkit/core";

export const groupsNamespacesUpdateNamespaces = defineTool({
  name: "groups:namespaces:update_namespaces",
  description: "Update a namespace. Deprecated in 17.8",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the namespace.",
      },
      shared_runners_minutes_limit: {
        type: "integer",
        description: "Compute minutes quota for the namespace.",
      },
      extra_shared_runners_minutes_limit: {
        type: "integer",
        description: "Extra compute minutes quota for the namespace.",
      },
      additional_purchased_storage_size: {
        type: "integer",
        description: "Additional storage size purchased for the namespace.",
      },
      additional_purchased_storage_ends_on: {
        type: "string",
        description: "End of subscription of the additional purchased storage.",
      },
      gitlab_subscription_attributes: {
        type: "object",
        description: "Object that contains information on the GitLab subscription.",
        properties: {
          start_date: {
            type: "string",
            description: "Start date of the subscription.",
          },
          seats: {
            type: "integer",
            description: "Number of seats in the subscription.",
          },
          max_seats_used: {
            type: "integer",
            description: "Highest number of active users in the last month.",
          },
          plan_code: {
            type: "string",
            description: "Subscription tier code.",
          },
          end_date: {
            type: "string",
            description: "End date of the subscription.",
          },
          auto_renew: {
            type: "boolean",
            description: "If `true`, the subscription renews automatically on the end date.",
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
            description:
              "Type of trial extension applied to the subscription. `1` means extended, `2` means reactivated.",
          },
        },
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/namespaces/{id}",
    body: [
      "shared_runners_minutes_limit",
      "extra_shared_runners_minutes_limit",
      "additional_purchased_storage_size",
      "additional_purchased_storage_ends_on",
      "gitlab_subscription_attributes",
    ],
  },
});
