import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsGetFieldConfigurationSchemeMappings = defineTool({
  name: 'fields:issue_field_configurations:get_field_configuration_scheme_mappings',
  description:
    '[Deprecated] Get field configuration issue type items. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
      fieldConfigurationSchemeId: {
        type: 'string',
        description:
          'The list of field configuration scheme IDs. To include multiple field configuration schemes separate IDs with ampersand: `fieldConfigurationSchemeId=10000&fieldConfigurationSchemeId=10001`. (comma-separated)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/fieldconfigurationscheme/mapping',
    query: ['startAt', 'maxResults', 'fieldConfigurationSchemeId'],
  },
});
