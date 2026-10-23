import { defineTool } from '@usemcpkit/core';

export const orgsHostedComputeUpdateNetworkConfigurationForOrg = defineTool({
  name: 'orgs:hosted_compute:update_network_configuration_for_org',
  description:
    'Update a hosted compute network configuration for an organization. Updates a hosted compute network configuration for an organization.',
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
    required: ['org', 'network_configuration_id'],
  },
  request: {
    method: 'PATCH',
    path: '/orgs/{org}/settings/network-configurations/{network_configuration_id}',
    body: [
      'name',
      'compute_service',
      'network_settings_ids',
      'failover_network_settings_ids',
      'failover_network_enabled',
    ],
  },
});
