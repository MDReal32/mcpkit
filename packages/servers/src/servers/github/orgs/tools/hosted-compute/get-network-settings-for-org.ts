import { defineTool } from '@usemcpkit/core';

export const hostedComputeGetNetworkSettingsForOrg = defineTool({
  name: 'hosted_compute:get_network_settings_for_org',
  description:
    'Get a hosted compute network settings resource for an organization. Gets a hosted compute network settings resource configured for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      network_settings_id: {
        type: 'string',
        description: 'Unique identifier of the hosted compute network settings.',
      },
    },
    required: ['org', 'network_settings_id'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/settings/network-settings/{network_settings_id}',
  },
});
