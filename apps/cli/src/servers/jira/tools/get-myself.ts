import { defineTool, input } from '@usemcpkit/core';

export const getMyself = defineTool({
  name: 'get_myself',
  description: 'Get the signed-in Jira user.',
  input: input(),
  request: { method: 'GET', path: '/rest/api/2/myself' },
  response: { fields: { name: 'displayName', email: 'emailAddress', account_id: 'accountId', username: 'name' } },
});
