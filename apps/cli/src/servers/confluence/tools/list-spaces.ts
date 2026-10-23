import { defineTool, input } from '@mcpkit/core';
import { LIMIT, SPACE_FIELDS } from '../const';

export const listSpaces = defineTool({
  name: 'list_spaces',
  description: 'List the spaces visible to the signed-in user.',
  input: input({ limit: LIMIT }),
  request: { method: 'GET', path: '/rest/api/space', query: ['limit'] },
  response: { root: 'results', fields: SPACE_FIELDS },
  editions: {
    cloud: { request: { method: 'GET', path: '/wiki/api/v2/spaces', query: ['limit'] } },
  },
});
