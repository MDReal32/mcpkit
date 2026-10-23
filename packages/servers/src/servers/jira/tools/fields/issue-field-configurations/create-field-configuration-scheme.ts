import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsCreateFieldConfigurationScheme = defineTool({
  name: 'fields:issue_field_configurations:create_field_configuration_scheme',
  description:
    '[Deprecated] Create field configuration scheme. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      description: {
        type: 'string',
        description: 'The description of the field configuration scheme.',
      },
      name: {
        type: 'string',
        description: 'The name of the field configuration scheme. The name must be unique.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/fieldconfigurationscheme',
    body: ['description', 'name'],
  },
});
