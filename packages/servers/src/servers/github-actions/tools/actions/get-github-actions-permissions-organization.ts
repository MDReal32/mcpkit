import { defineTool } from '@usemcpkit/core';

export const actionsGetGithubActionsPermissionsOrganization = defineTool({
  name: 'actions:get_github_actions_permissions_organization',
  description:
    'Get GitHub Actions permissions for an organization. Gets the GitHub Actions permissions policy for repositories and allowed actions and reusable workflows in an organization.',
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
    path: '/orgs/{org}/actions/permissions',
  },
});
