import { defineTool } from '@usemcpkit/core';

export const ciRunnersListRunnerControllers = defineTool({
  name: 'ci:runners:list_runner_controllers',
  description: 'List all runner controllers. Lists all runner controllers.',
  input: {
    type: 'object',
    properties: {
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
  },
  request: {
    method: 'GET',
    path: '/runner_controllers',
    query: ['page', 'per_page'],
  },
});
