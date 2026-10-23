import { defineTool } from '@usemcpkit/core';

export const issuesLabelsGetProjectsLabels = defineTool({
  name: 'issues:labels:get_projects_labels',
  description: 'Retrieve a project label. Retrieves a specified label for a project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'ID or name of the label.',
      },
      include_ancestor_groups: {
        type: 'boolean',
        default: true,
        description: 'If `true`, includes ancestor groups.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/labels/{name}',
    query: ['include_ancestor_groups'],
  },
});
