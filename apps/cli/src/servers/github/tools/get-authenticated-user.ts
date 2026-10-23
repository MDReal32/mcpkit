import { defineTool, input } from '@usemcpkit/core';

export const getAuthenticatedUser = defineTool({
  name: 'get_authenticated_user',
  description: 'Get the user that owns the token.',
  input: input(),
  request: { method: 'GET', path: '/user' },
  response: { fields: ['login', 'name', 'html_url', 'public_repos'] },
});
