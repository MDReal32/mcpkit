import { defineTool } from '@usemcpkit/core';

export const issuesMilestonesUpdateProjectsMilestones = defineTool({
  name: 'issues:milestones:update_projects_milestones',
  description: 'Update a project milestone. Updates a specified project milestone.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      milestone_id: {
        type: 'integer',
        description: 'The milestone ID number',
      },
      title: {
        type: 'string',
        description:
          'The title of the milestone. At least one of `title`, `description`, `start_date`, `due_date`, `state_event` must be provided.',
      },
      state_event: {
        type: 'string',
        description:
          'State event of the milestone. At least one of `title`, `description`, `start_date`, `due_date`, `state_event` must be provided.',
        enum: ['close', 'activate'],
      },
      description: {
        type: 'string',
        description:
          'The description of the milestone. At least one of `title`, `description`, `start_date`, `due_date`, `state_event` must be provided.',
      },
      due_date: {
        type: 'string',
        description:
          'Due date of the milestone, in ISO 8601 format (`YYYY-MM-DD`). At least one of `title`, `description`, `start_date`, `due_date`, `state_event` must be provided.',
      },
      start_date: {
        type: 'string',
        description:
          'Start date of the milestone, in ISO 8601 format (`YYYY-MM-DD`). At least one of `title`, `description`, `start_date`, `due_date`, `state_event` must be provided.',
      },
    },
    required: ['id', 'milestone_id'],
  },
  request: {
    method: 'PUT',
    path: '/projects/{id}/milestones/{milestone_id}',
    body: ['title', 'state_event', 'description', 'due_date', 'start_date'],
  },
});
