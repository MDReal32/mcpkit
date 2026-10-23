import { defineTool } from '@usemcpkit/core';

export const orgsCreateIssueField = defineTool({
  name: 'orgs:create_issue_field',
  description: 'Create issue field for an organization. Creates a new issue field for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'Name of the issue field.',
      },
      description: {
        type: 'string',
        description: 'Description of the issue field.',
      },
      data_type: {
        type: 'string',
        description: 'The data type of the issue field.',
        enum: ['text', 'date', 'single_select', 'multi_select', 'number'],
      },
      visibility: {
        type: 'string',
        description:
          'The visibility of the issue field. Can be `organization_members_only` (visible only within the organization) or `all` (visible to all users who can see issues). Only used when the visibility settings feature is enabled. Defaults to `organization_members_only`.',
        enum: ['organization_members_only', 'all'],
      },
      options: {
        type: 'array',
        description: "Options for select fields. Required when data_type is 'single_select' or 'multi_select'.",
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the option.',
            },
            description: {
              type: 'string',
              description: 'Description of the option.',
            },
            color: {
              type: 'string',
              description: 'Color for the option.',
              enum: ['gray', 'blue', 'green', 'yellow', 'orange', 'red', 'pink', 'purple'],
            },
            priority: {
              type: 'integer',
              description: 'Priority of the option for ordering.',
            },
          },
          required: ['name', 'color', 'priority'],
        },
      },
    },
    required: ['org', 'name', 'data_type'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/issue-fields',
    body: ['name', 'description', 'data_type', 'visibility', 'options'],
  },
});
