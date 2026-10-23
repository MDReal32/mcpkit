import { defineTool, input } from '@usemcpkit/core';

export const getAuthenticatedUser = defineTool({
  name: 'user:me',
  description: 'Get the user that owns the token.',
  input: input(),
  request: { method: 'GET', path: '/user' },
  response: { fields: ['login', 'name', 'html_url', 'public_repos'] },
});
