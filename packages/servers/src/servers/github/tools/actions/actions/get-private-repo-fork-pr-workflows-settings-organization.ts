import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetPrivateRepoForkPrWorkflowsSettingsOrganization = defineTool({
  name: 'actions:actions:get_private_repo_fork_pr_workflows_settings_organization',
  description:
    'Get private repo fork PR workflow settings for an organization. Gets the settings for whether workflows from fork pull requests can run on private repositories in an organization.',
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
    path: '/orgs/{org}/actions/permissions/fork-pr-workflows-private-repos',
  },
});
