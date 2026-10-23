import { defineTool } from '@usemcpkit/core';

export const projectsAddItemForOrg = defineTool({
  name: 'projects:add_item_for_org',
  description:
    'Add item to organization owned project. Add an issue or pull request item to the specified organization owned project.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      project_number: {
        type: 'integer',
        description: "The project's number.",
      },
      type: {
        type: 'string',
        description: 'The type of item to add to the project. Must be either Issue or PullRequest.',
        enum: ['Issue', 'PullRequest'],
      },
      id: {
        type: 'integer',
        description: 'The unique identifier of the issue or pull request to add to the project.',
      },
      owner: {
        type: 'string',
        description: 'The repository owner login.',
      },
      repo: {
        type: 'string',
        description: 'The repository name.',
      },
      number: {
        type: 'integer',
        description: 'The issue or pull request number.',
      },
    },
    required: ['org', 'project_number', 'type'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/projectsV2/{project_number}/items',
    body: ['type', 'id', 'owner', 'repo', 'number'],
  },
});
