import { defineTool } from '@usemcpkit/core';

export const actionsGetHostedRunnersGithubOwnedImagesForOrg = defineTool({
  name: 'actions:get_hosted_runners_github_owned_images_for_org',
  description:
    'Get GitHub-owned images for GitHub-hosted runners in an organization. Get the list of GitHub-owned images available for GitHub-hosted runners for an organization.',
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
    path: '/orgs/{org}/actions/hosted-runners/images/github-owned',
  },
});
