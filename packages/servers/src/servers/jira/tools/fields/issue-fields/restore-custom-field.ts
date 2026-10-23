import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsRestoreCustomField = defineTool({
  name: 'fields:issue_fields:restore_custom_field',
  description:
    'Restore custom field from trash. Restores a custom field from trash. See Edit or delete a custom field for more information on trashing and deleting custom fields.',
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
    path: '/rest/api/2/field/{id}/restore',
  },
});
