import { defineTool } from "@usemcpkit/core";

export const metaUsageDataListUsageDataNonSqlMetrics = defineTool({
  name: "meta:usage_data:list_usage_data_non_sql_metrics",
  description:
    "List all non-SQL metrics. Lists all non-SQL metrics data used in the Service ping. Administrators only.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/usage_data/non_sql_metrics",
  },
});
