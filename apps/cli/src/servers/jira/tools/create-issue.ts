import { defineTool, input, optional, string } from '@mcpkit/core';

export const createIssue = defineTool({
  name: 'create_issue',
  description: 'Create an issue in a project.',
  input: input({
    project_key: string('Project key, for example PROJ'),
    summary: string('Issue summary'),
    issue_type: string('Issue type name, for example Task or Bug', { default: 'Task' }),
    description: optional(string('Issue description (Jira wiki markup)')),
  }),
  request: {
    method: 'POST',
    path: '/rest/api/2/issue',
    body: {
      'fields.project.key': 'project_key',
      'fields.summary': 'summary',
      'fields.issuetype.name': 'issue_type',
      'fields.description': 'description',
    },
  },
  response: { fields: { id: 'id', key: 'key' } },
});
