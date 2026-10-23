import { defineTool } from "@usemcpkit/core";

export const cloudV1AuditGetRetentionPeriod = defineTool({
  name: "cloud_v1:audit:get_retention_period",
  description:
    "[Cloud v1] Get retention period. Returns the retention period for records in the audit log. The retention period is how long an audit record is kept for, from creation date until it is deleted.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/audit/retention",
  },
});
