import { defineTool } from '@usemcpkit/core';

export const securityCodeSecurityAttachEnterpriseConfiguration = defineTool({
  name: 'security:code_security:attach_enterprise_configuration',
  description:
    'Attach an enterprise configuration to repositories. Attaches an enterprise code security configuration to repositories. If the repositories specified are already attached to a configuration, they will be re-attached to the provided configuration.',
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
      scope: {
        type: 'string',
        description: 'The type of repositories to attach the configuration to.',
        enum: ['all', 'all_without_configurations'],
      },
    },
    required: ['enterprise', 'configuration_id', 'scope'],
  },
  request: {
    method: 'POST',
    path: '/enterprises/{enterprise}/code-security/configurations/{configuration_id}/attach',
    body: ['scope'],
  },
});
