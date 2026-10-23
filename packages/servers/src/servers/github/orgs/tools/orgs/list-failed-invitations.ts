import { defineTool } from '@usemcpkit/core';

export const orgsListFailedInvitations = defineTool({
  name: 'orgs:list_failed_invitations',
  description:
    'List failed organization invitations. The return hash contains `failed_at` and `failed_reason` fields which represent the time at which the invitation failed and the reason for the failure.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
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
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/failed_invitations',
    query: ['per_page', 'page'],
  },
});
