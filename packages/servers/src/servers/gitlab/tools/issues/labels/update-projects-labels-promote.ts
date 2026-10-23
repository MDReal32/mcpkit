import { defineTool } from '@usemcpkit/core';

export const issuesLabelsUpdateProjectsLabelsPromote = defineTool({
  name: 'issues:labels:update_projects_labels_promote',
  description:
    '[Deprecated] Promote a label to a group label. Added in GitLab 12.3 and deprecated in GitLab 12.4. Use PUT /projects/:id/labels/:name/promote instead.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      name: {
        type: 'string',
        description: 'Name of the label to promote.',
      },
    },
    required: ['id', 'name'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/labels/promote',
    body: ['name'],
  },
});
