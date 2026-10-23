import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsDeleteCustomFieldContext = defineTool({
  name: 'fields:issue_custom_field_contexts:delete_custom_field_context',
  description: 'Delete custom field context. Deletes a custom field context.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field.',
      },
      contextId: {
        type: 'integer',
        description: 'The ID of the context.',
      },
    },
    required: ['fieldId', 'contextId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/field/{fieldId}/context/{contextId}',
  },
});
