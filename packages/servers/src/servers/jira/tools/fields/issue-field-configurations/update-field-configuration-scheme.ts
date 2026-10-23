import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsUpdateFieldConfigurationScheme = defineTool({
  name: 'fields:issue_field_configurations:update_field_configuration_scheme',
  description:
    '[Deprecated] Update field configuration scheme. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration scheme.',
      },
      description: {
        type: 'string',
        description: 'The description of the field configuration scheme.',
      },
      name: {
        type: 'string',
        description: 'The name of the field configuration scheme. The name must be unique.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/fieldconfigurationscheme/{id}',
    body: ['description', 'name'],
  },
});
