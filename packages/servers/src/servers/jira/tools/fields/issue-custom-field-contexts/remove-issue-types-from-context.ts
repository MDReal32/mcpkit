import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsRemoveIssueTypesFromContext = defineTool({
  name: 'fields:issue_custom_field_contexts:remove_issue_types_from_context',
  description: 'Remove issue types from context. Removes issue types from a custom field context.',
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
      issueTypeIds: {
        type: 'array',
        description: 'The list of issue type IDs.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['fieldId', 'contextId', 'issueTypeIds'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/field/{fieldId}/context/{contextId}/issuetype/remove',
    body: ['issueTypeIds'],
  },
});
