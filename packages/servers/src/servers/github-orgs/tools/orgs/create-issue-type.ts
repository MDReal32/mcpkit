import { defineTool } from '@usemcpkit/core';

export const orgsCreateIssueType = defineTool({
  name: 'orgs:create_issue_type',
  description: 'Create issue type for an organization. Create a new issue type for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'Name of the issue type.',
      },
      is_enabled: {
        type: 'boolean',
        description: 'Whether or not the issue type is enabled at the organization level.',
      },
      description: {
        type: 'string',
        description: 'Description of the issue type.',
      },
      color: {
        type: 'string',
        description: 'Color for the issue type.',
        enum: ['gray', 'blue', 'green', 'yellow', 'orange', 'red', 'pink', 'purple'],
      },
    },
    required: ['org', 'name', 'is_enabled'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/issue-types',
    body: ['name', 'is_enabled', 'description', 'color'],
  },
});
