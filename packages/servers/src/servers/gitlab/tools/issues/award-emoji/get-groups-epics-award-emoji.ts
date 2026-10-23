import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiGetGroupsEpicsAwardEmoji = defineTool({
  name: 'issues:award_emoji:get_groups_epics_award_emoji',
  description:
    'Retrieve an emoji reaction from an epic. Retrieves a specified emoji reaction from an epic. This endpoint can be accessed without authentication if the epic is publicly accessible.',
  input: {
    type: 'object',
    properties: {
      award_id: {
        type: 'integer',
        description: 'ID of the emoji reaction.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
      },
      epic_iid: {
        type: 'integer',
        description: 'Internal ID of the epic.',
      },
    },
    required: ['award_id', 'id', 'epic_iid'],
  },
  request: {
    method: 'GET',
    path: '/groups/{id}/epics/{epic_iid}/award_emoji/{award_id}',
  },
});
