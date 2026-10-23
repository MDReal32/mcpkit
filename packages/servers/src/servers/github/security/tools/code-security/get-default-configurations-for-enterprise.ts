import { defineTool } from '@usemcpkit/core';

export const codeSecurityGetDefaultConfigurationsForEnterprise = defineTool({
  name: 'code_security:get_default_configurations_for_enterprise',
  description:
    'Get default code security configurations for an enterprise. Lists the default code security configurations for an enterprise.',
  input: {
    type: 'object',
    properties: {
      enterprise: {
        type: 'string',
        description: 'The slug version of the enterprise name.',
      },
    },
    required: ['enterprise'],
  },
  request: {
    method: 'GET',
    path: '/enterprises/{enterprise}/code-security/configurations/defaults',
  },
});
