import { defineTool } from '@usemcpkit/core';

export const workflowsPrioritySchemesGetProjectsByPriorityScheme = defineTool({
  name: 'workflows:priority_schemes:get_projects_by_priority_scheme',
  description: 'Get projects by priority scheme. Returns a paginated list of projects by scheme.',
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'string',
        description: 'The priority scheme ID.',
      },
      startAt: {
        type: 'string',
        default: '0',
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'string',
        default: '50',
        description: 'The maximum number of items to return per page.',
      },
      projectId: {
        type: 'string',
        description: 'The project IDs to filter by. For example, `projectId=10000&projectId=10001`. (comma-separated)',
      },
      query: {
        type: 'string',
        default: '',
        description: 'The string to query projects on by name.',
      },
    },
    required: ['schemeId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/priorityscheme/{schemeId}/projects',
    query: ['startAt', 'maxResults', 'projectId', 'query'],
  },
});
