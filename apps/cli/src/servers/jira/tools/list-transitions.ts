import { defineTool, input } from '@mcpkit/core';
import { ISSUE_KEY } from '../const';

export const listTransitions = defineTool({
  name: 'list_transitions',
  description: 'List the workflow transitions available for an issue.',
  input: input({ issue_key: ISSUE_KEY }),
  request: { method: 'GET', path: '/rest/api/2/issue/{issue_key}/transitions' },
  response: { root: 'transitions', fields: { id: 'id', name: 'name', to_status: 'to.name' } },
});
