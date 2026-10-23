import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsGetFieldConfigurationItems = defineTool({
  name: 'fields:issue_field_configurations:get_field_configuration_items',
  description:
    '[Deprecated] Get field configuration items. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration.',
      },
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
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/fieldconfiguration/{id}/fields',
    query: ['startAt', 'maxResults'],
  },
});
