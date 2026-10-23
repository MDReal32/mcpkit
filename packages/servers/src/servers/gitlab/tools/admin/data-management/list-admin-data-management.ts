import { defineTool } from '@usemcpkit/core';

export const adminDataManagementListAdminDataManagement = defineTool({
  name: 'admin:data_management:list_admin_data_management',
  description:
    'Retrieve model information. Retrieves information about a data model in an instance. Only available to administrators.',
  input: {
    type: 'object',
    properties: {
      model_name: {
        type: 'string',
        description:
          'See https://docs.gitlab.com/administration/admin_area/#data-management for the list of allowed values',
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
      identifiers: {
        type: 'array',
        description:
          'Filter results with an array of unique identifiers of the requested model, which can be integers or base64 encoded strings.',
      },
      checksum_state: {
        type: 'string',
        enum: ['pending', 'started', 'succeeded', 'failed', 'disabled'],
        description: 'Filter by checksum status.',
      },
      cursor: {
        type: 'string',
        description: 'Cursor for obtaining the next set of records.',
      },
      sort: {
        type: 'string',
        default: 'asc',
        enum: ['asc', 'desc'],
        description: 'Sort results in ascending or descending order.',
      },
    },
    required: ['model_name'],
  },
  request: {
    method: 'GET',
    path: '/admin/data_management/{model_name}',
    query: ['page', 'per_page', 'identifiers', 'checksum_state', 'cursor', 'sort'],
  },
});
