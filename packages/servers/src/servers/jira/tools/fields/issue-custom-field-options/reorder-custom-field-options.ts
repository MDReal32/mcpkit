import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldOptionsReorderCustomFieldOptions = defineTool({
  name: 'fields:issue_custom_field_options:reorder_custom_field_options',
  description:
    'Reorder custom field options (context). Changes the order of custom field options or cascading options in a context.',
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
      after: {
        type: 'string',
        description:
          "The ID of the custom field option or cascading option to place the moved options after. Required if `position` isn't provided.",
      },
      customFieldOptionIds: {
        type: 'array',
        description:
          'A list of IDs of custom field options to move. The order of the custom field option IDs in the list is the order they are given after the move. The list must contain custom field options or cascading options, but not both.',
        items: {
          type: 'string',
        },
      },
      position: {
        type: 'string',
        description: "The position the custom field options should be moved to. Required if `after` isn't provided.",
        enum: ['First', 'Last'],
      },
    },
    required: ['fieldId', 'contextId', 'customFieldOptionIds'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/field/{fieldId}/context/{contextId}/option/move',
    body: ['after', 'customFieldOptionIds', 'position'],
  },
});
