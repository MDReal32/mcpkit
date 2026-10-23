import { defineTool } from '@usemcpkit/core';

export const appsGetAuthenticated = defineTool({
  name: 'apps:get_authenticated',
  description:
    'Get the authenticated app. Returns the GitHub App associated with the authentication credentials used. To see how many app installations are associated with this GitHub App, see the `installations_count` in the response. For more details about your app\'s installations, see the "List installations for the authenticated app" endpoint.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/app',
  },
});
