import { defineTool } from "@usemcpkit/core";

export const adminAdvancedSearchRolloutUpdateElasticsearchIndexedNamespacesRollback = defineTool({
  name: "admin:advanced_search_rollout:update_elasticsearch_indexed_namespaces_rollback",
  description: "Rollback namespaces to be indexed down to n%. This feature was introduced in GitLab 12.7.",
  input: {
    type: "object",
    properties: {
      percentage: {
        type: "integer",
        description: "Percentage of namespaces to enable or disable Elasticsearch indexing for.",
      },
      plan: {
        type: "string",
        description: "Subscription tier to rollout Elasticsearch for.",
        enum: [
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
      },
    },
    required: ["percentage", "plan"],
  },
  request: {
    method: "PUT",
    path: "/elasticsearch_indexed_namespaces/rollback",
    body: ["percentage", "plan"],
  },
});
