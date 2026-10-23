import { defineTool } from "@usemcpkit/core";

export const metaUsageDataListUsageDataQueries = defineTool({
  name: "meta:usage_data:list_usage_data_queries",
  description:
    "List all Service Ping SQL queries. Lists all raw SQL queries used to compute Service Ping. Administrators only.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/usage_data/queries",
  },
});
