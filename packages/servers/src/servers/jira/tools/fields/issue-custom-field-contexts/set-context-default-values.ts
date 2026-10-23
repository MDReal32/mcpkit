import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldContextsSetContextDefaultValues = defineTool({
  name: 'fields:issue_custom_field_contexts:set_context_default_values',
  description:
    'Set default values for a custom field by context and issue type. Updates default values for individual issue types in custom field contexts.',
  input: {
    type: 'object',
    properties: {
      fieldId: {
        type: 'string',
        description: 'The ID of the custom field, for example \\{@code customfield\\_10000\\}.',
      },
      defaultValues: {
        type: 'array',
        description: 'The default values to update.',
        items: {
          type: 'object',
          description: 'A default value update for one issue-type scope in a context.',
          properties: {
            contextId: {
              type: 'integer',
              description: 'The ID of the context.',
            },
            isAnyIssueType: {
              type: 'boolean',
              description: 'True when this is the catch-all default for issue types without a specific default.',
            },
            issueTypeId: {
              type: 'string',
              description: 'The ID of the issue type this default value applies to.',
            },
            value: {
              type: 'object',
            },
          },
          required: ['contextId'],
        },
      },
    },
    required: ['fieldId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/field/{fieldId}/context/defaultValues',
    body: ['defaultValues'],
  },
});
