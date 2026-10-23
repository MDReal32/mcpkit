import { defineTool } from '@usemcpkit/core';

export const metaInstanceGetApplicationSettings = defineTool({
  name: 'meta:instance:get_application_settings',
  description: 'Retrieve application settings. Retrieves the current application settings for this GitLab instance.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/application/settings',
  },
});
