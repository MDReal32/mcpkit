import { defineTool } from "@usemcpkit/core";

export const groupsOrganizationsCreateInternalOrgMoverCancelMaintenance = defineTool({
  name: "groups:organizations:create_internal_org_mover_cancel_maintenance",
  description:
    "Cancel maintenance on an organization (maintenance_initialization -> active). Aborts maintenance initialization before the organization reaches the maintenance state, returning it to active.",
  input: {
    type: "object",
    properties: {
      organization_id: {
        type: "integer",
        description: "The ID of the organization",
      },
    },
    required: ["organization_id"],
  },
  request: {
    method: "POST",
    path: "/internal/org_mover/cancel_maintenance",
    body: ["organization_id"],
  },
});
