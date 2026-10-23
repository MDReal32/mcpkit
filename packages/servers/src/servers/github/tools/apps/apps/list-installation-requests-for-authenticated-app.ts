import { defineTool } from '@usemcpkit/core';

export const appsAppsListInstallationRequestsForAuthenticatedApp = defineTool({
  name: 'apps:apps:list_installation_requests_for_authenticated_app',
  description:
    'List installation requests for the authenticated app. Lists all the pending installation requests for the authenticated GitHub App.',
  input: {
    type: 'object',
    properties: {
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
    },
  },
  request: {
    method: 'GET',
    path: '/app/installation-requests',
    query: ['per_page', 'page'],
  },
});
