import { defineTool } from '@usemcpkit/core';

export const codeSecurityGetSingleConfigurationForEnterprise = defineTool({
  name: 'code_security:get_single_configuration_for_enterprise',
  description:
    'Retrieve a code security configuration of an enterprise. Gets a code security configuration available in an enterprise.',
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
    method: 'GET',
    path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}',
  },
});
