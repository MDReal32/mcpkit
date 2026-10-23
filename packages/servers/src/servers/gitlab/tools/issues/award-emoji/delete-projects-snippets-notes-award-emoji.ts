import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiDeleteProjectsSnippetsNotesAwardEmoji = defineTool({
  name: 'issues:award_emoji:delete_projects_snippets_notes_award_emoji',
  description:
    'Delete an emoji reaction from a snippet comment. Deletes a specified emoji reaction from a comment on a snippet. Only an administrator or the user who added the reaction can delete it.',
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
      note_id: {
        type: 'integer',
        description: 'ID of the note.',
      },
    },
    required: ['award_id', 'id', 'snippet_id', 'note_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/snippets/{snippet_id}/notes/{note_id}/award_emoji/{award_id}',
  },
});
