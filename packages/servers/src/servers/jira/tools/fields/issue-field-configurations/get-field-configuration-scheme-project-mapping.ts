import { defineTool } from '@usemcpkit/core';

export const fieldsIssueFieldConfigurationsGetFieldConfigurationSchemeProjectMapping = defineTool({
  name: 'fields:issue_field_configurations:get_field_configuration_scheme_project_mapping',
  description:
    '[Deprecated] Get field configuration schemes for projects. Deprecated, use Field schemes which supports field association schemes.',
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
      projectId: {
        type: 'string',
        description:
          'The list of project IDs. To include multiple projects, separate IDs with ampersand: `projectId=10000&projectId=10001`. (comma-separated)',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/fieldconfigurationscheme/project',
    query: ['startAt', 'maxResults', 'projectId'],
  },
});
