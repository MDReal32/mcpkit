import { defineTool } from '@usemcpkit/core';

export const datacenterColorSchemeGetDefault = defineTool({
  name: 'datacenter:color_scheme:get_default',
  description: '[Data Center] Get default global color scheme. Get default color scheme for the instance',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/color-scheme/default',
  },
});
