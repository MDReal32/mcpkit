import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesSearchSecuritySchemes = defineTool({
  name: 'fields:issue_security_schemes:search_security_schemes',
  description:
    'Search issue security schemes. Returns a paginated list of issue security schemes. If you specify the project ID parameter, the result will contain issue security schemes and related project IDs you filter by. Use \\{@link IssueSecuritySchemeResource\\#searchProjectsUsingSecuritySchemes(String, String, Set, Set)\\} to obtain all projects related to scheme.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'string',
        default: '0',
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'string',
        default: '50',
        description: 'The maximum number of items to return per page.',
      },
      id: {
        type: 'string',
        description:
          'The list of issue security scheme IDs. To include multiple issue security scheme IDs, separate IDs with an ampersand: `id=10000&id=10001`. (comma-separated)',
      },
      projectId: {
        type: 'string',
        description:
          'The list of project IDs. To include multiple project IDs, separate IDs with an ampersand: `projectId=10000&projectId=10001`. (comma-separated)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuesecurityschemes/search',
    query: ['startAt', 'maxResults', 'id', 'projectId'],
  },
});
