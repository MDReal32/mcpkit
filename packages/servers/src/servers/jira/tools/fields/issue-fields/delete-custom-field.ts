import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldsDeleteCustomField = defineTool({
  name: 'fields:issue_fields:delete_custom_field',
  description:
    'Delete custom field. Deletes a custom field. The custom field is deleted whether it is in the trash or not. See Edit or delete a custom field for more information on trashing and deleting custom fields.',
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
    method: 'DELETE',
    path: '/rest/api/2/field/{id}',
  },
});
