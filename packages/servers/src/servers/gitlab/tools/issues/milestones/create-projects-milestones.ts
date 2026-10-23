import { defineTool } from '@usemcpkit/core';

export const issuesMilestonesCreateProjectsMilestones = defineTool({
  name: 'issues:milestones:create_projects_milestones',
  description: 'Create a project milestone. Creates a project milestone.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      title: {
        type: 'string',
        description: 'The title of the milestone',
      },
      description: {
        type: 'string',
        description: 'The description of the milestone',
      },
      due_date: {
        type: 'string',
        description: 'Due date of the milestone, in ISO 8601 format (`YYYY-MM-DD`).',
      },
      start_date: {
        type: 'string',
        description: 'Start date of the milestone, in ISO 8601 format (`YYYY-MM-DD`).',
      },
    },
    required: ['id', 'title'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/milestones',
    body: ['title', 'description', 'due_date', 'start_date'],
  },
});
