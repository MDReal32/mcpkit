import { defineTool } from "@usemcpkit/core";

export const groupsOrganizationsGetInternalOrgMoverMaintenanceReadiness = defineTool({
  name: "groups:organizations:get_internal_org_mover_maintenance_readiness",
  description:
    "Report cutover readiness for an organization. Reports whether an organization is drained and safe to enter maintenance, and what is blocking it when not.",
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
    path: "/internal/org_mover/maintenance_readiness",
    query: ["organization_id"],
  },
});
