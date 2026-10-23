import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypesGetIssueTypesForProject = defineTool({
  name: 'workflows:issue_types:get_issue_types_for_project',
  description: 'Get issue types for project. Returns issue types for a project.',
  input: {
    type: 'object',
    properties: {
      projectId: {
        type: 'integer',
        description: 'The ID of the project.',
      },
      level: {
        type: 'integer',
        description: 'The level of the issue type to filter by. Use:',
      },
    },
    required: ['projectId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuetype/project',
    query: ['projectId', 'level'],
  },
});
