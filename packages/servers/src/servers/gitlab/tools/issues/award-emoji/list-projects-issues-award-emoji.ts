import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiListProjectsIssuesAwardEmoji = defineTool({
  name: 'issues:award_emoji:list_projects_issues_award_emoji',
  description:
    'List all emoji reactions for an issue. Lists all emoji reactions for a specified issue. This endpoint can be accessed without authentication if the issue is publicly accessible.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      issue_iid: {
        type: 'integer',
        description: 'ID (`iid` for merge requests/issues/epics, `id` for snippets) of an awardable.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id', 'issue_iid'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/issues/{issue_iid}/award_emoji',
    query: ['page', 'per_page'],
  },
});
