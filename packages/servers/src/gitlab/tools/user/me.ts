import { defineTool, input } from '@usemcpkit/core';

export const getCurrentUser = defineTool({
  name: 'user:me',
  description: 'Get the signed-in user.',
  input: input(),
  request: { method: 'GET', path: '/user' },
  response: { fields: { id: 'id', username: 'username', name: 'name', email: 'email', url: 'web_url' } },
});
