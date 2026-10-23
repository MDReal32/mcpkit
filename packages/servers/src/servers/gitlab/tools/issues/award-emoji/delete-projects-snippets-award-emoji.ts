import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiDeleteProjectsSnippetsAwardEmoji = defineTool({
  name: 'issues:award_emoji:delete_projects_snippets_award_emoji',
  description:
    'Delete an emoji reaction from a snippet. Deletes a specified emoji reaction from a snippet. Only an administrator or the user who added the reaction can delete it.',
  input: {
    type: 'object',
    properties: {
      award_id: {
        type: 'integer',
        description: 'ID of the emoji reaction.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      snippet_id: {
        type: 'integer',
        description: 'ID of the snippet.',
      },
    },
    required: ['award_id', 'id', 'snippet_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/snippets/{snippet_id}/award_emoji/{award_id}',
  },
});
