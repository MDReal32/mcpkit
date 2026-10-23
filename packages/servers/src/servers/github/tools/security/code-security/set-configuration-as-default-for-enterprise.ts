import { defineTool } from '@usemcpkit/core';

export const securityCodeSecuritySetConfigurationAsDefaultForEnterprise = defineTool({
  name: 'security:code_security:set_configuration_as_default_for_enterprise',
  description:
    'Set a code security configuration as a default for an enterprise. Sets a code security configuration as a default to be applied to new repositories in your enterprise.',
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
      default_for_new_repos: {
        type: 'string',
        description: 'Specify which types of repository this security configuration should be applied to by default.',
        enum: ['all', 'none', 'private_and_internal', 'public'],
      },
    },
    required: ['enterprise', 'configuration_id'],
  },
  request: {
    method: 'PUT',
    path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}/defaults',
    body: ['default_for_new_repos'],
  },
});
