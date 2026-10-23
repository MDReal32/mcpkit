import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsUpdateFieldConfigurationItems = defineTool({
  name: 'fields:issue_field_configurations:update_field_configuration_items',
  description:
    '[Deprecated] Update field configuration items. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration.',
      },
      fieldConfigurationItems: {
        type: 'array',
        description: 'Details of fields in a field configuration.',
        items: {
          type: 'object',
          description: 'A field within a field configuration.',
          properties: {
            description: {
              type: 'string',
              description: 'The description of the field within the field configuration.',
            },
            id: {
              type: 'string',
              description: 'The ID of the field within the field configuration.',
            },
            isHidden: {
              type: 'boolean',
              description: 'Whether the field is hidden in the field configuration.',
            },
            isRequired: {
              type: 'boolean',
              description: 'Whether the field is required in the field configuration.',
            },
            renderer: {
              type: 'string',
              description: 'The renderer type for the field within the field configuration.',
            },
          },
          required: ['id'],
        },
      },
    },
    required: ['id', 'fieldConfigurationItems'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/fieldconfiguration/{id}/fields',
    body: ['fieldConfigurationItems'],
  },
});
