import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsRemoveIssueTypesFromGlobalFieldConfigurationScheme = defineTool({
  name: 'fields:issue_field_configurations:remove_issue_types_from_global_field_configuration_scheme',
  description:
    '[Deprecated] Remove issue types from field configuration scheme. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the field configuration scheme.',
      },
      issueTypeIds: {
        type: 'array',
        description:
          'The list of issue type IDs. Must contain unique values not longer than 255 characters and not be empty. Maximum of 100 IDs.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['id', 'issueTypeIds'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/fieldconfigurationscheme/{id}/mapping/delete',
    body: ['issueTypeIds'],
  },
});
