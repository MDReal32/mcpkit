import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListOutsideCollaborators = defineTool({
  name: 'orgs:orgs:list_outside_collaborators',
  description:
    'List outside collaborators for an organization. List all users who are outside collaborators of an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      filter: {
        type: 'string',
        default: 'all',
        enum: ['2fa_disabled', '2fa_insecure', 'all'],
        description:
          'Filter the list of outside collaborators. `2fa_disabled` means that only outside collaborators without two-factor authentication enabled will be returned. `2fa_insecure` means that only outside collaborators with insecure 2FA methods will be returned.',
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
    path: '/orgs/{org}/outside_collaborators',
    query: ['filter', 'per_page', 'page'],
  },
});
