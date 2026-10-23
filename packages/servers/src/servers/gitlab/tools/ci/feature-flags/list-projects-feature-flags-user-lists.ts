import { defineTool } from '@usemcpkit/core';

export const ciFeatureFlagsListProjectsFeatureFlagsUserLists = defineTool({
  name: 'ci:feature_flags:list_projects_feature_flags_user_lists',
  description:
    'List all feature flag user lists for a project. Lists all feature flag user lists for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      search: {
        type: 'string',
        description: 'Return user lists matching the search criteria.',
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
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/feature_flags_user_lists',
    query: ['search', 'page', 'per_page'],
  },
});
