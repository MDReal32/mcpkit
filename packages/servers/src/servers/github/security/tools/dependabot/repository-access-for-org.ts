import { defineTool } from '@usemcpkit/core';

export const dependabotRepositoryAccessForOrg = defineTool({
  name: 'dependabot:repository_access_for_org',
  description:
    'Lists the repositories Dependabot can access in an organization. Lists repositories that organization admins have allowed Dependabot to access when updating dependencies. > [!NOTE] > This operation supports both server-to-server and user-to-server access. Unauthorized users will not see the existence of this endpoint.',
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
        description: 'The page number of results to fetch.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description: 'Number of results per page.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/dependabot/repository-access',
    query: ['page', 'per_page'],
  },
});
