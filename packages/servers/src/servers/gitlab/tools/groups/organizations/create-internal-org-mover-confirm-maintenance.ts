import { defineTool } from '@usemcpkit/core';

export const groupsOrganizationsCreateInternalOrgMoverConfirmMaintenance = defineTool({
  name: 'groups:organizations:create_internal_org_mover_confirm_maintenance',
  description:
    'Confirm maintenance on an organization (maintenance_initialization -> maintenance). Completes the maintenance transition once the organization is drained.',
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
    path: '/internal/org_mover/confirm_maintenance',
    body: ['organization_id'],
  },
});
