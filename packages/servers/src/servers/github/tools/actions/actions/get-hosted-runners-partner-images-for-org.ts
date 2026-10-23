import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetHostedRunnersPartnerImagesForOrg = defineTool({
  name: 'actions:actions:get_hosted_runners_partner_images_for_org',
  description:
    'Get partner images for GitHub-hosted runners in an organization. Get the list of partner images available for GitHub-hosted runners for an organization.',
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
    path: '/orgs/{org}/actions/hosted-runners/images/partner',
  },
});
