import { defineTool } from '@usemcpkit/core';

export const securityAccessTokensListPersonalAccessTokensSelfAssociations = defineTool({
  name: 'security:access_tokens:list_personal_access_tokens_self_associations',
  description:
    'List all token associations. Lists all groups and projects accessible by the personal access token used to authenticate the request. Generally, this includes any groups or projects that the user is a member of.',
  input: {
    type: 'object',
    properties: {
      min_access_level: {
        type: 'integer',
        enum: [10, 15, 20, 25, 30, 40, 50],
        description:
          'Return groups and projects where the current user has at least the specified access level. For a list of values, see roles.',
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
  },
  request: {
    method: 'GET',
    path: '/personal_access_tokens/self/associations',
    query: ['min_access_level', 'page', 'per_page'],
  },
});
