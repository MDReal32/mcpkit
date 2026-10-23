import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeScreenSchemesGetIssueTypeScreenSchemeProjectAssociations = defineTool({
  name: 'workflows:issue_type_screen_schemes:get_issue_type_screen_scheme_project_associations',
  description:
    'Get issue type screen schemes for projects. Returns a paginated list of issue type screen schemes and, for each issue type screen scheme, a list of the projects that use it.',
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
    path: '/rest/api/2/issuetypescreenscheme/project',
    query: ['startAt', 'maxResults', 'projectId'],
  },
});
