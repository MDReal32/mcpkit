import { defineTool } from '@usemcpkit/core';

export const collaborationFiltersSetColumns = defineTool({
  name: 'collaboration:filters:set_columns',
  description:
    'Set columns. Sets the columns for a filter. Only navigable fields can be set as columns. Use Get fields to get the list fields in Jira. A navigable field has `navigable` set to `true`.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the filter.',
      },
      columns: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
    required: ['id'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/filter/{id}/columns',
    body: ['columns'],
  },
});
