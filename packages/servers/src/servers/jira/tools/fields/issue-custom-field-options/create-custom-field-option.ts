import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldOptionsCreateCustomFieldOption = defineTool({
  name: 'fields:issue_custom_field_options:create_custom_field_option',
  description:
    'Create custom field options (context). Creates options and, where the custom select field is of the type Select List (cascading), cascading options for a custom select field. The options are added to a context of the field.',
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
      options: {
        type: 'array',
        description: 'Details of options to create.',
        items: {
          type: 'object',
          description: 'Details of a custom field option to create.',
          properties: {
            disabled: {
              type: 'boolean',
              description: 'Whether the option is disabled.',
            },
            optionId: {
              type: 'string',
              description: 'For cascading options, the ID of a parent option.',
            },
            value: {
              type: 'string',
              description: 'The value of the custom field option.',
            },
          },
          required: ['value'],
        },
      },
    },
    required: ['fieldId', 'contextId'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/field/{fieldId}/context/{contextId}/option',
    body: ['options'],
  },
});
