import { defineTool } from '@usemcpkit/core';

export const hostedComputeCreateNetworkConfigurationForOrg = defineTool({
  name: 'hosted_compute:create_network_configuration_for_org',
  description:
    'Create a hosted compute network configuration for an organization. Creates a hosted compute network configuration for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description:
          "Name of the network configuration. Must be between 1 and 100 characters and may only contain upper and lowercase letters a-z, numbers 0-9, '.', '-', and '_'.",
      },
      compute_service: {
        type: 'string',
        description: 'The hosted compute service to use for the network configuration.',
        enum: ['none', 'actions'],
      },
      network_settings_ids: {
        type: 'array',
        description:
          'A list of identifiers of the network settings resources to use for the network configuration. Exactly one resource identifier must be specified in the list.',
        items: {
          type: 'string',
        },
      },
      failover_network_settings_ids: {
        type: 'array',
        description:
          'A list of identifiers of the failover network settings resources to use for the network configuration. Exactly one resource identifier must be specified in the list.',
        items: {
          type: 'string',
        },
      },
      failover_network_enabled: {
        type: 'boolean',
        description: 'Indicates whether the failover network resource is enabled.',
      },
    },
    required: ['org', 'name', 'network_settings_ids'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/settings/network-configurations',
    body: [
      'name',
      'compute_service',
      'network_settings_ids',
      'failover_network_settings_ids',
      'failover_network_enabled',
    ],
  },
});
