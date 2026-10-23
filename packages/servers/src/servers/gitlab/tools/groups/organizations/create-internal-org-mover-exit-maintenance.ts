import { defineTool } from '@usemcpkit/core';

export const groupsOrganizationsCreateInternalOrgMoverExitMaintenance = defineTool({
  name: 'groups:organizations:create_internal_org_mover_exit_maintenance',
  description:
    'Exit maintenance on an organization (maintenance -> active). Returns an organization from maintenance to active.',
  input: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'integer',
        description: 'The ID of the organization',
      },
    },
    required: ['organization_id'],
  },
  request: {
    method: 'POST',
    path: '/internal/org_mover/exit_maintenance',
    body: ['organization_id'],
  },
});
