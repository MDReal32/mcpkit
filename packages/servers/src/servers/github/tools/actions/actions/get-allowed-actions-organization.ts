import { defineTool } from '@usemcpkit/core';

export const actionsActionsGetAllowedActionsOrganization = defineTool({
  name: 'actions:actions:get_allowed_actions_organization',
  description:
    'Get allowed actions and reusable workflows for an organization. Gets the selected actions and reusable workflows that are allowed in an organization. To use this endpoint, the organization permission policy for `allowed_actions` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for an organization."',
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
    path: '/orgs/{org}/actions/permissions/selected-actions',
  },
});
