import { defineTool } from '@usemcpkit/core';

export const issuesCodeReviewAnalyticsListAnalyticsCodeReview = defineTool({
  name: 'issues:code_review_analytics:list_analytics_code_review',
  description:
    'List code review information about project. Retrieves code review analytics data for a specific project.',
  input: {
    type: 'object',
    properties: {
      project_id: {
        type: 'integer',
        description: 'ID of the project.',
      },
      label_name: {
        type: 'string',
        description: 'Array of label names to filter by (comma-separated)',
      },
      milestone_title: {
        type: 'string',
        description: 'Milestone title to filter by',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
      not: {
        type: 'object',
        description: 'Return merge requests that do not match the specified parameters.',
      },
      not_label_name: {
        type: 'string',
        description: 'Array of label names to filter by (comma-separated)',
      },
      not_milestone_title: {
        type: 'string',
        description: 'Milestone title to filter by',
      },
    },
    required: ['project_id'],
  },
  request: {
    method: 'GET',
    path: '/analytics/code_review',
    query: {
      project_id: 'project_id',
      label_name: 'label_name',
      milestone_title: 'milestone_title',
      page: 'page',
      per_page: 'per_page',
      not: 'not',
      'not[label_name]': 'not_label_name',
      'not[milestone_title]': 'not_milestone_title',
    },
  },
});
