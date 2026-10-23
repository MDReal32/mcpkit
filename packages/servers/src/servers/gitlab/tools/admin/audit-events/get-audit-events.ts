import { defineTool } from '@usemcpkit/core';

export const adminAuditEventsGetAuditEvents = defineTool({
  name: 'admin:audit_events:get_audit_events',
  description: 'Retrieve an instance audit event. Retrieves a specified instance audit event.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the audit event.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/audit_events/{id}',
  },
});
