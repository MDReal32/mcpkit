import { defineTool } from '@usemcpkit/core';

export const issuesLabelsUpdateProjectsLabelsPromotePut = defineTool({
  name: 'issues:labels:update_projects_labels_promote_put',
  description:
    'Promote a project label to a group label. Promotes a specified project label to a group label. The label keeps its ID.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name or ID of the label to promote.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/labels/{name}/promote',
  },
});
