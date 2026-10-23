import { defineTool, input } from '@usemcpkit/core';
import { ISSUE_KEY } from '../../const';

export const listTransitions = defineTool({
  name: 'transition:list',
  description: 'List the workflow transitions available for an issue.',
  input: input({ issue_key: ISSUE_KEY }),
  request: { method: 'GET', path: '/rest/api/2/issue/{issue_key}/transitions' },
  response: { root: 'transitions', fields: { id: 'id', name: 'name', to_status: 'to.name' } },
});
