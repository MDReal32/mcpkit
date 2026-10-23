import { defineTool } from '@usemcpkit/core';

export const usersMyselfGetLocale = defineTool({
  name: 'users:myself:get_locale',
  description: 'Get locale. Returns the locale for the user.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/mypreferences/locale',
  },
});
