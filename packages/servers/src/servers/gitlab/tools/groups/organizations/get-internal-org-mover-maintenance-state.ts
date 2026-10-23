import { defineTool } from "@usemcpkit/core";

export const groupsOrganizationsGetInternalOrgMoverMaintenanceState = defineTool({
  name: "groups:organizations:get_internal_org_mover_maintenance_state",
  description:
    "Report an organization's current lifecycle state. Returns the organization's current maintenance lifecycle state.",
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
    method: "GET",
    path: "/internal/org_mover/maintenance_state",
    query: ["organization_id"],
  },
});
