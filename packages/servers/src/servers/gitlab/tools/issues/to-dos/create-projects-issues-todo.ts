import { defineTool } from '@usemcpkit/core';

export const issuesToDosCreateProjectsIssuesTodo = defineTool({
  name: 'issues:to_dos:create_projects_issues_todo',
  description:
    'Create a to-do item for an issuable. Creates a to-do item for the current user on a specified issuable. If a to-do item already exists for the user on that issuable, returns a `304` status code.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      issue_iid: {
        type: 'integer',
        description: 'The internal ID of an issuable',
      },
    },
    required: ['id', 'issue_iid'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/issues/{issue_iid}/todo',
  },
});
