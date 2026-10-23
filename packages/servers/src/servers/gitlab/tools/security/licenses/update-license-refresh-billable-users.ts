import { defineTool } from "@usemcpkit/core";

export const securityLicensesUpdateLicenseRefreshBillableUsers = defineTool({
  name: "security:licenses:update_license_refresh_billable_users",
  description:
    "Trigger recalculation of billable users. Triggers recalculation of billable users for a specified license.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the GitLab license.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/license/{id}/refresh_billable_users",
  },
});
