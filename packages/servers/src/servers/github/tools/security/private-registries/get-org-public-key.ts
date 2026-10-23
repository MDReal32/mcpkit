import { defineTool } from '@usemcpkit/core';

export const securityPrivateRegistriesGetOrgPublicKey = defineTool({
  name: 'security:private_registries:get_org_public_key',
  description:
    'Get private registries public key for an organization. Gets the org public key, which is needed to encrypt private registry secrets. You need to encrypt a secret before you can create or update secrets.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/private-registries/public-key',
  },
});
