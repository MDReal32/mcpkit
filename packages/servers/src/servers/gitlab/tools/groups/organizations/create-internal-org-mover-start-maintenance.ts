import { defineTool } from '@usemcpkit/core';

export const groupsOrganizationsCreateInternalOrgMoverStartMaintenance = defineTool({
  name: 'groups:organizations:create_internal_org_mover_start_maintenance',
  description:
    'Start maintenance on an organization (active -> maintenance_initialization). Begins the maintenance transition for an organization.',
  input: {
    type: 'object',
    properties: {
      organization_id: {
        type: 'integer',
        description: 'The ID of the organization',
      },
      maintenance_reason: {
        type: 'string',
        description: 'The reason for entering maintenance',
        enum: ['migration', 'isolation', 'incident', 'billing', 'legal'],
      },
    },
    required: ['organization_id', 'maintenance_reason'],
  },
  request: {
    method: 'POST',
    path: '/internal/org_mover/start_maintenance',
    body: ['organization_id', 'maintenance_reason'],
  },
});
