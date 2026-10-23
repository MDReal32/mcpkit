import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsSetFieldConfigurationSchemeMapping = defineTool({
  name: 'fields:issue_field_configurations:set_field_configuration_scheme_mapping',
  description:
    '[Deprecated] Assign issue types to field configurations. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration scheme.',
      },
      mappings: {
        type: 'array',
        description: 'Field configuration to issue type mappings.',
        items: {
          type: 'object',
          description: 'The field configuration to issue type mapping.',
          properties: {
            fieldConfigurationId: {
              type: 'string',
              description: 'The ID of the field configuration.',
            },
            issueTypeId: {
              type: 'string',
              description:
                'The ID of the issue type or *default*. When set to *default* this field configuration issue type item applies to all issue types without a field configuration. An issue type can be included only once in a request.',
            },
          },
          required: ['fieldConfigurationId', 'issueTypeId'],
        },
      },
    },
    required: ['id', 'mappings'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/fieldconfigurationscheme/{id}/mapping',
    body: ['mappings'],
  },
});
