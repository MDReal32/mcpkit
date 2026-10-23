import { defineTool } from '@usemcpkit/core';

export const orgsOrgsListIssueTypes = defineTool({
  name: 'orgs:orgs:list_issue_types',
  description:
    'List issue types for an organization. Lists all issue types for an organization. OAuth app tokens and personal access tokens (classic) need the read:org scope to use this endpoint.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/issue-types',
  },
});
