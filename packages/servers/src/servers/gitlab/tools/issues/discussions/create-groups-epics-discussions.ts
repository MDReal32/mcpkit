import { defineTool } from '@usemcpkit/core';

export const issuesDiscussionsCreateGroupsEpicsDiscussions = defineTool({
  name: 'issues:discussions:create_groups_epics_discussions',
  description:
    'Create an epic discussion. Creates a discussion for a specified epic. Replies can be added to it later.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      noteable_id: {
        type: 'integer',
        description: 'ID of the epic.',
      },
      body: {
        type: 'string',
        description: 'Content of the note or reply.',
      },
      created_at: {
        type: 'string',
        description:
          'Date and time the note was created, in ISO 8601 format such as `2016-03-11T03:45:40Z`. Requires administrator or project/group owner rights.',
      },
    },
    required: ['id', 'noteable_id', 'body'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/epics/{noteable_id}/discussions',
    body: ['body', 'created_at'],
  },
});
