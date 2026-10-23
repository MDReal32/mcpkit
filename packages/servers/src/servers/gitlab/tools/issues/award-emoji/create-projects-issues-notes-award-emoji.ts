import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiCreateProjectsIssuesNotesAwardEmoji = defineTool({
  name: 'issues:award_emoji:create_projects_issues_notes_award_emoji',
  description: 'Add an emoji reaction to an issue comment. Adds an emoji reaction to a comment on an issue.',
  input: {
    type: 'object',
    properties: {
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
      name: {
        type: 'string',
        description: 'Name of the emoji without colons.',
      },
    },
    required: ['id', 'issue_iid', 'note_id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/issues/{issue_iid}/notes/{note_id}/award_emoji',
    body: ['name'],
  },
});
