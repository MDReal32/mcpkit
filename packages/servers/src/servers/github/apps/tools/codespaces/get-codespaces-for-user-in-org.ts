import { defineTool } from '@usemcpkit/core';

export const codespacesGetCodespacesForUserInOrg = defineTool({
  name: 'codespaces:get_codespaces_for_user_in_org',
  description:
    'List codespaces for a user in organization. Lists the codespaces that a member of an organization has for repositories in that organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
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
    required: ['org', 'username'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/members/{username}/codespaces',
    query: ['per_page', 'page'],
  },
});
