import { defineTool } from '@usemcpkit/core';

export const projectsKeysListGroupsSshCertificates = defineTool({
  name: 'projects:keys:list_groups_ssh_certificates',
  description: 'List all group SSH certificates. Lists all SSH certificates for a specified group.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the group.',
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
    path: '/groups/{id}/ssh_certificates',
    query: ['page', 'per_page'],
  },
});
