import { defineTool } from '@usemcpkit/core';

export const groupsServiceAccountsListProjectsServiceAccounts = defineTool({
  name: 'groups:service_accounts:list_projects_service_accounts',
  description:
    'List all project service accounts. Lists all service accounts in a specified project. Use the `page` and `per_page` pagination parameters to filter the results.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
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
      order_by: {
        type: 'string',
        default: 'id',
        enum: ['id', 'username'],
        description: 'Sort results by the specified field.',
      },
      sort: {
        type: 'string',
        default: 'desc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/service_accounts',
    query: ['page', 'per_page', 'order_by', 'sort'],
  },
});
