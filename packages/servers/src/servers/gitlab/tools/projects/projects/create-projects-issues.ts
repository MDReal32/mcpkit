import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsIssues = defineTool({
  name: 'projects:projects:create_projects_issues',
  description: 'Create an issue. Creates an issue for a specified project.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      title: {
        type: 'string',
        description: 'Title of the issue.',
      },
      created_at: {
        type: 'string',
        description: 'Date and time the issue was created. Requires administrator or project/group owner rights.',
      },
      merge_request_to_resolve_discussions_of: {
        type: 'integer',
        description:
          'Internal ID of a merge request for which to resolve discussions. This fills the issue with a default description and marks all discussions as resolved, unless a title or description is provided.',
      },
      discussion_to_resolve: {
        type: 'string',
        description:
          'ID of a discussion to resolve. Use in combination with `merge_request_to_resolve_discussions_of`.',
      },
      iid: {
        type: 'integer',
        description: 'Internal ID to assign to the new issue. Administrators or project owners only.',
      },
      description: {
        type: 'string',
        description: 'Description of the issue. Limited to 1,048,576 characters.',
      },
      assignee_ids: {
        type: 'array',
        description:
          'IDs of the users to assign to the issue. Set to `0` or leave empty to unassign all assignees. Assigning more than one user is Premium and Ultimate only.',
        items: {
          type: 'integer',
        },
      },
      assignee_id: {
        type: 'integer',
        description:
          'ID of the user to assign the issue to. Available only on GitLab Free. Deprecated. Use `assignee_ids` instead.',
      },
      milestone_id: {
        type: 'integer',
        description:
          'Global ID of a milestone to assign to the issue. Set to `0` or leave empty to unassign the milestone. Mutually exclusive with `milestone`.',
      },
      milestone: {
        type: 'string',
        description:
          'The title of a project or ancestor-group milestone to assign the issue to. Mutually exclusive with `milestone_id`.',
      },
      labels: {
        type: 'array',
        description:
          'Comma-separated list of label names. `None` means no labels are assigned. `Any` means at least one label is assigned. `No+Label` (deprecated) means no labels are assigned. Set to an empty string to unassign all labels. If a label does not already exist, this creates a new project label and assigns it to the issue. Predefined names are case-insensitive.',
        items: {
          type: 'string',
        },
      },
      add_labels: {
        type: 'array',
        description:
          'Comma-separated label names to add to the issue. If a label does not already exist, this creates a new project label and assigns it to the issue.',
        items: {
          type: 'string',
        },
      },
      remove_labels: {
        type: 'array',
        description: 'Comma-separated label names to remove from the issue.',
        items: {
          type: 'string',
        },
      },
      due_date: {
        type: 'string',
        description: 'Due date, in the format `YYYY-MM-DD`, for example `2016-03-11`.',
      },
      start_date: {
        type: 'string',
        description: 'Start date, in the format `YYYY-MM-DD`, for example `2016-03-11`. Introduced in GitLab 19.1.',
      },
      confidential: {
        type: 'boolean',
        description: 'If `true`, the issue is confidential.',
      },
      discussion_locked: {
        type: 'boolean',
        description: "If `true`, locks the issue's discussion so only project members can add or edit comments.",
      },
      issue_type: {
        type: 'string',
        description: 'The type of the issue. Accepts: issue, incident, test_case, requirement, task, ticket',
        enum: ['issue', 'incident', 'test_case', 'requirement', 'task', 'ticket'],
      },
      severity: {
        type: 'string',
        description:
          'The severity of the issue. Only applies to incidents. Accepts: unknown, low, medium, high, critical',
        enum: ['unknown', 'low', 'medium', 'high', 'critical'],
      },
      weight: {
        type: 'integer',
        description: 'The weight of the issue',
      },
      epic_id: {
        type: 'integer',
        description:
          'ID of an epic to associate the issue with. Must be `0` or greater. Premium and Ultimate only. Mutually exclusive with `epic_iid`.',
      },
      epic_iid: {
        type: 'integer',
        description:
          'Internal ID of an epic to associate the issue with. Must be `0` or greater. Deprecated and scheduled for removal in API version 5. Premium and Ultimate only. Mutually exclusive with `epic_id`.',
      },
    },
    required: ['id', 'title'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/issues',
    body: [
      'title',
      'created_at',
      'merge_request_to_resolve_discussions_of',
      'discussion_to_resolve',
      'iid',
      'description',
      'assignee_ids',
      'assignee_id',
      'milestone_id',
      'milestone',
      'labels',
      'add_labels',
      'remove_labels',
      'due_date',
      'start_date',
      'confidential',
      'discussion_locked',
      'issue_type',
      'severity',
      'weight',
      'epic_id',
      'epic_iid',
    ],
  },
});
