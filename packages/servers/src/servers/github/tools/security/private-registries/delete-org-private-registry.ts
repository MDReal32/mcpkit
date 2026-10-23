import { defineTool } from '@usemcpkit/core';

export const securityPrivateRegistriesDeleteOrgPrivateRegistry = defineTool({
  name: 'security:private_registries:delete_org_private_registry',
  description:
    'Delete a private registry for an organization. Delete a private registry configuration at the organization-level.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      secret_name: {
        type: 'string',
        description: 'The name of the secret.',
      },
    },
    required: ['org', 'secret_name'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/private-registries/{secret_name}',
  },
});
