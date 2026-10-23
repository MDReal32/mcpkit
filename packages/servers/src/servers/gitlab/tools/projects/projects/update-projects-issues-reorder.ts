import { defineTool } from '@usemcpkit/core';

export const projectsProjectsUpdateProjectsIssuesReorder = defineTool({
  name: 'projects:projects:update_projects_issues_reorder',
  description:
    'Update the order of an issue. Updates the order of a specified issue in a project. You can see the results when sorting issues manually.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      issue_iid: {
        type: 'integer',
        description: 'Internal ID of the issue.',
      },
      move_after_id: {
        type: 'integer',
        description:
          'Global ID of the project issue to place this issue after. At least one of `move_after_id`, `move_before_id` must be provided.',
      },
      move_before_id: {
        type: 'integer',
        description:
          'Global ID of the project issue to place this issue before. At least one of `move_after_id`, `move_before_id` must be provided.',
      },
    },
    required: ['id', 'issue_iid'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/issues/{issue_iid}/reorder',
    body: ['move_after_id', 'move_before_id'],
  },
});
