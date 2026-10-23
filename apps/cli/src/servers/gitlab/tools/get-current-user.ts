import { defineTool, input } from '@mcpkit/core';

export const getCurrentUser = defineTool({
  name: 'get_current_user',
  description: 'Get the signed-in user.',
  input: input(),
  request: { method: 'GET', path: '/user' },
  response: { fields: { id: 'id', username: 'username', name: 'name', email: 'email', url: 'web_url' } },
});
