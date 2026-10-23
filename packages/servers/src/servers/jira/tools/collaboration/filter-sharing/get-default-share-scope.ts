import { defineTool } from '@usemcpkit/core';

export const collaborationFilterSharingGetDefaultShareScope = defineTool({
  name: 'collaboration:filter_sharing:get_default_share_scope',
  description:
    'Get default share scope. Returns the default sharing settings for new filters and dashboards for a user.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/filter/defaultShareScope',
  },
});
