import { defineTool } from '@usemcpkit/core';

export const copilotListCopilotSeats = defineTool({
  name: 'copilot:list_copilot_seats',
  description:
    'List all Copilot seat assignments for an organization. > [!NOTE] > This endpoint is in public preview and is subject to change.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 50,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/copilot/billing/seats',
    query: ['page', 'per_page'],
  },
});
