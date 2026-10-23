import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiCreateGroupsEpicsAwardEmoji = defineTool({
  name: 'issues:award_emoji:create_groups_epics_award_emoji',
  description: 'Add an emoji reaction to an epic. Adds an emoji reaction to an epic.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      epic_iid: {
        type: 'integer',
        description: 'Internal ID of the epic.',
      },
      name: {
        type: 'string',
        description: 'Name of the emoji without colons.',
      },
    },
    required: ['id', 'epic_iid', 'name'],
  },
  request: {
    method: 'POST',
    path: '/groups/{id}/epics/{epic_iid}/award_emoji',
    body: ['name'],
  },
});
