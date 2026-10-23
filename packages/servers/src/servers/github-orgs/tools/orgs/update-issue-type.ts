import { defineTool } from '@usemcpkit/core';

export const orgsUpdateIssueType = defineTool({
  name: 'orgs:update_issue_type',
  description: 'Update issue type for an organization. Updates an issue type for an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      issue_type_id: {
        type: 'integer',
        description: 'The unique identifier of the issue type.',
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
    required: ['org', 'issue_type_id', 'name', 'is_enabled'],
  },
  request: {
    method: 'PUT',
    path: '/orgs/{org}/issue-types/{issue_type_id}',
    body: ['name', 'is_enabled', 'description', 'color'],
  },
});
