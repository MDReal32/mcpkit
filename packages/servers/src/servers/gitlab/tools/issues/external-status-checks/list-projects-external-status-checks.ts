import { defineTool } from '@usemcpkit/core';

export const issuesExternalStatusChecksListProjectsExternalStatusChecks = defineTool({
  name: 'issues:external_status_checks:list_projects_external_status_checks',
  description:
    'Retrieve project external status check services. Retrieves information on external status check services for a project.',
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/external_status_checks',
    query: ['page', 'per_page'],
  },
});
