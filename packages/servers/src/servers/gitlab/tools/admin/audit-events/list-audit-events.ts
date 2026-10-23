import { defineTool } from '@usemcpkit/core';

export const adminAuditEventsListAuditEvents = defineTool({
  name: 'admin:audit_events:list_audit_events',
  description:
    'List all instance audit events. Lists all available instance audit events, limited to a maximum of 30 days for each query.',
  input: {
    type: 'object',
    properties: {
      entity_type: {
        type: 'string',
        enum: ['Project', 'User', 'Group', 'Gitlab::Audit::InstanceScope'],
        description: 'Return audit events for the specified entity type.',
      },
      entity_id: {
        type: 'integer',
        description: 'Return audit events for the specified entity ID. Requires the `entity_type` attribute.',
      },
      created_after: {
        type: 'string',
        description: 'Return audit events created on or after the specified time.',
      },
      created_before: {
        type: 'string',
        description: 'Return audit events created on or before the specified time.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['entity_type'],
  },
  request: {
    method: 'GET',
    path: '/audit_events',
    query: ['entity_type', 'entity_id', 'created_after', 'created_before', 'page', 'per_page'],
  },
});
