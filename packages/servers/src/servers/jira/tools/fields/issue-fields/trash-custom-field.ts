import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsTrashCustomField = defineTool({
  name: 'fields:issue_fields:trash_custom_field',
  description:
    'Move custom field to trash. Moves a custom field to trash. See Edit or delete a custom field for more information on trashing and deleting custom fields.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of a custom field.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/field/{id}/trash',
  },
});
