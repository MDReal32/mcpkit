import { defineTool } from '@usemcpkit/core';

export const securityCodeSecurityDetachConfiguration = defineTool({
  name: 'security:code_security:detach_configuration',
  description:
    'Detach configurations from repositories. Detach code security configuration(s) from a set of repositories. Repositories will retain their settings but will no longer be associated with the configuration.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      selected_repository_ids: {
        type: 'array',
        description: 'An array of repository IDs to detach from configurations. Up to 250 IDs can be provided.',
        items: {
          type: 'integer',
          description: 'Unique identifier of the repository.',
        },
      },
    },
    required: ['org', 'selected_repository_ids'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/code-security/configurations/detach',
    body: ['selected_repository_ids'],
  },
});
