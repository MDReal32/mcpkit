import { defineTool } from "@usemcpkit/core";

export const adminAnalyticsListProjectsAnalyticsDeploymentFrequency = defineTool({
  name: "admin:analytics:list_projects_analytics_deployment_frequency",
  description:
    "List deployment frequencies for the project. Retrieves deployment frequency analytics data for a specific project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      environment: {
        type: "string",
        description: "Name of the environment to filter by.",
      },
      from: {
        type: "string",
        description: "Datetime to start from, inclusive.",
      },
      to: {
        type: "string",
        description: "Datetime to end at, exclusive. If omitted, defaults to the current time.",
      },
      interval: {
        type: "string",
        enum: ["all", "monthly", "daily"],
        description: "Interval to roll up data by. If omitted, defaults to `all`.",
      },
    },
    required: ["id", "environment", "from"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/analytics/deployment_frequency",
    query: ["environment", "from", "to", "interval"],
  },
});
