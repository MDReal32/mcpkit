import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsUpdateFieldConfiguration = defineTool({
  name: 'fields:issue_field_configurations:update_field_configuration',
  description:
    '[Deprecated] Update field configuration. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration.',
      },
      description: {
        type: 'string',
        description: 'The description of the field configuration.',
      },
      name: {
        type: 'string',
        description: 'The name of the field configuration. Must be unique.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/fieldconfiguration/{id}',
    body: ['description', 'name'],
  },
});
