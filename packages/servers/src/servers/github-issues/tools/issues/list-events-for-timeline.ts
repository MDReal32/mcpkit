import { defineTool } from '@usemcpkit/core';

export const issuesListEventsForTimeline = defineTool({
  name: 'issues:list_events_for_timeline',
  description: 'List timeline events for an issue. List all timeline events for an issue.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      issue_number: {
        type: 'integer',
        description: 'The number that identifies the issue.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      exclude: {
        type: 'string',
        description: 'A comma-separated list of timeline event names to exclude from the response.',
      },
    },
    required: ['owner', 'repo', 'issue_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/timeline',
    query: ['per_page', 'page', 'exclude'],
  },
});
