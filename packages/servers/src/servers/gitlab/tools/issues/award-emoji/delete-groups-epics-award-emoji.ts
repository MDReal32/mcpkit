import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiDeleteGroupsEpicsAwardEmoji = defineTool({
  name: 'issues:award_emoji:delete_groups_epics_award_emoji',
  description:
    'Delete an emoji reaction from an epic. Deletes a specified emoji reaction from an epic. Only an administrator or the user who added the reaction can delete it.',
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
    method: 'DELETE',
    path: '/groups/{id}/epics/{epic_iid}/award_emoji/{award_id}',
  },
});
