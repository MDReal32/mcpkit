import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsAssignFieldConfigurationSchemeToProject = defineTool({
  name: 'fields:issue_field_configurations:assign_field_configuration_scheme_to_project',
  description:
    '[Deprecated] Assign field configuration scheme to project. Deprecated, use Field schemes which supports field association schemes.',
  input: {
    type: 'object',
    properties: {
      fieldConfigurationSchemeId: {
        type: 'string',
        description:
          'The ID of the field configuration scheme. If the field configuration scheme ID is `null`, the operation assigns the default field configuration scheme.',
      },
      projectId: {
        type: 'string',
        description: 'The ID of the project.',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/fieldconfigurationscheme/project',
    body: ['fieldConfigurationSchemeId', 'projectId'],
  },
});
