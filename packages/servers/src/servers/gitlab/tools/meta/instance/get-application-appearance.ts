import { defineTool } from '@usemcpkit/core';

export const metaInstanceGetApplicationAppearance = defineTool({
  name: 'meta:instance:get_application_appearance',
  description:
    "Get the current appearance. Retrieves the instance's branding and appearance configuration including logos, colors, and custom headers.",
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/application/appearance',
  },
});
