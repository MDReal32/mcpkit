import { defineTool } from '@usemcpkit/core';

export const groupsGroupsGetGroupsAuditEvents = defineTool({
  name: 'groups:groups:get_groups_audit_events',
  description:
    'Retrieve a group audit event. Retrieves an audit event for a specified group. Only available to group Owners and administrators.',
  input: {
    type: 'object',
    properties: {
      audit_event_id: {
        type: 'integer',
        description: 'ID of the audit event.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
    },
    required: ['audit_event_id', 'id'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/audit_events/{audit_event_id}',
  },
});
