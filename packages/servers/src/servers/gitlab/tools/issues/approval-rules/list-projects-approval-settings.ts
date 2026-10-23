import { defineTool } from '@usemcpkit/core';

export const issuesApprovalRulesListProjectsApprovalSettings = defineTool({
  name: 'issues:approval_rules:list_projects_approval_settings',
  description: 'Get all project approval rules. Private API subject to change',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      target_branch: {
        type: 'string',
        description: 'Branch that scoped approval rules apply to.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/approval_settings',
    query: ['target_branch'],
  },
});
