import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiDeleteProjectsIssuesNotesAwardEmoji = defineTool({
  name: 'issues:award_emoji:delete_projects_issues_notes_award_emoji',
  description:
    'Delete an emoji reaction from an issue comment. Deletes a specified emoji reaction from a comment on an issue. Only an administrator or the user who added the reaction can delete it.',
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
      issue_iid: {
        type: 'integer',
        description: 'The internal ID of an issuable',
      },
      note_id: {
        type: 'integer',
        description: 'ID of the note.',
      },
    },
    required: ['award_id', 'id', 'issue_iid', 'note_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/issues/{issue_iid}/notes/{note_id}/award_emoji/{award_id}',
  },
});
