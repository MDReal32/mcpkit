import { defineTool } from '@usemcpkit/core';

export const usersActivityGetStargazerHistoryForRepo = defineTool({
  name: 'users:activity:get_stargazer_history_for_repo',
  description:
    "Get repository star history. Returns repository stars grouped by calendar weeks, most recent first. Pages move backward toward the repository's creation week, and weeks within a page are ordered newest to oldest, so concatenating pages produces one continuous series. Weeks without stars contain zero counts. Week and day boundaries are not guaranteed to align with UTC. The `days` array contains the number of stars created on…",
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
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 30). For more information, see "Using pagination in the REST API."',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/stargazers/history',
    query: ['per_page', 'page'],
  },
});
