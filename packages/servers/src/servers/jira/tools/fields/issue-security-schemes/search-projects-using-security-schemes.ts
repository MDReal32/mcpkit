import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesSearchProjectsUsingSecuritySchemes = defineTool({
  name: 'fields:issue_security_schemes:search_projects_using_security_schemes',
  description:
    "Get projects using issue security schemes. Returns a paginated mapping of projects that are using security schemes. You can provide either one or multiple security scheme IDs or project IDs to filter by. If you don't provide any, this will return a list of all mappings. Only issue security schemes in the context of classic projects are supported. **Permissions required:** *Administer Jira* global permission.",
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
      issueSecuritySchemeId: {
        type: 'string',
        description: 'The list of security scheme IDs to be filtered out. (comma-separated)',
      },
      projectId: {
        type: 'string',
        description: 'The list of project IDs to be filtered out. (comma-separated)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuesecurityschemes/project',
    query: ['startAt', 'maxResults', 'issueSecuritySchemeId', 'projectId'],
  },
});
