import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsDeleteFieldConfiguration = defineTool({
  name: 'fields:issue_field_configurations:delete_field_configuration',
  description:
    '[Deprecated] Delete field configuration. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/fieldconfiguration/{id}',
  },
});
