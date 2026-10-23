import { defineTool } from '@usemcpkit/core';

export const codeSecurityDeleteConfigurationForEnterprise = defineTool({
  name: 'code_security:delete_configuration_for_enterprise',
  description:
    'Delete a code security configuration for an enterprise. Deletes a code security configuration from an enterprise. Repositories attached to the configuration will retain their settings but will no longer be associated with the configuration.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
      configuration_id: {
        type: 'integer',
        description: 'The unique identifier of the code security configuration.',
      },
    },
    required: ['enterprise', 'configuration_id'],
  },
  request: {
    method: 'DELETE',
    path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}',
  },
});
