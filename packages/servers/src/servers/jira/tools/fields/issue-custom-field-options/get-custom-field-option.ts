import { defineTool } from '@usemcpkit/core';

export const fieldsIssueCustomFieldOptionsGetCustomFieldOption = defineTool({
  name: 'fields:issue_custom_field_options:get_custom_field_option',
  description: 'Get custom field option. Returns a custom field option. For example, an option in a select list.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the custom field option.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/customFieldOption/{id}',
  },
});
