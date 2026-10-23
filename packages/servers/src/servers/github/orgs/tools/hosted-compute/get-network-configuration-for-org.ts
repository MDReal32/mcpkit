import { defineTool } from '@usemcpkit/core';

export const hostedComputeGetNetworkConfigurationForOrg = defineTool({
  name: 'hosted_compute:get_network_configuration_for_org',
  description:
    'Get a hosted compute network configuration for an organization. Gets a hosted compute network configuration configured in an organization.',
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
    method: 'GET',
    path: '/orgs/{org}/settings/network-configurations/{network_configuration_id}',
  },
});
