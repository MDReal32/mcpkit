import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetSelfHostedRunnersPermissionsOrganization = defineTool({
  name: 'actions:actions:get_self_hosted_runners_permissions_organization',
  description:
    'Get self-hosted runners settings for an organization. Gets the settings for self-hosted runners for an organization.',
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
    path: '/orgs/{org}/actions/permissions/self-hosted-runners',
  },
});
