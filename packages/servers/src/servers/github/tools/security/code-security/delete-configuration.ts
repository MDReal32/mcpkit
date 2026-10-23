import { defineTool } from '@usemcpkit/core';

export const securityCodeSecurityDeleteConfiguration = defineTool({
  name: 'security:code_security:delete_configuration',
  description:
    'Delete a code security configuration. Deletes the desired code security configuration from an organization. Repositories attached to the configuration will retain their settings but will no longer be associated with the configuration.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      configuration_id: {
        type: 'integer',
        description: 'The unique identifier of the code security configuration.',
      },
    },
    required: ['org', 'configuration_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/code-security/configurations/{configuration_id}',
  },
});
