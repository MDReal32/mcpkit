import { defineTool } from '@usemcpkit/core';

export const orgsHostedComputeDeleteNetworkConfigurationFromOrg = defineTool({
  name: 'orgs:hosted_compute:delete_network_configuration_from_org',
  description:
    'Delete a hosted compute network configuration from an organization. Deletes a hosted compute network configuration from an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      network_configuration_id: {
        type: 'string',
        description: 'Unique identifier of the hosted compute network configuration.',
      },
    },
    required: ['org', 'network_configuration_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/settings/network-configurations/{network_configuration_id}',
  },
});
