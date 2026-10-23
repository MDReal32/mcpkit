import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiDeleteProjectsIssuesAwardEmoji = defineTool({
  name: 'issues:award_emoji:delete_projects_issues_award_emoji',
  description:
    'Delete an emoji reaction from an issue. Deletes a specified emoji reaction from an issue. Only an administrator or the user who added the reaction can delete it.',
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
    },
    required: ['award_id', 'id', 'issue_iid'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/issues/{issue_iid}/award_emoji/{award_id}',
  },
});
