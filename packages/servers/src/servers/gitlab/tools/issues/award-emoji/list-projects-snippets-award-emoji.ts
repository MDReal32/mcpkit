import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiListProjectsSnippetsAwardEmoji = defineTool({
  name: 'issues:award_emoji:list_projects_snippets_award_emoji',
  description:
    'List all emoji reactions for a snippet. Lists all emoji reactions for a specified snippet. This endpoint can be accessed without authentication if the snippet is publicly accessible.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      snippet_id: {
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
    required: ['id', 'snippet_id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/snippets/{snippet_id}/award_emoji',
    query: ['page', 'per_page'],
  },
});
