import { defineTool } from '@usemcpkit/core';

export const actionsActionsListCustomImageVersionsForOrg = defineTool({
  name: 'actions:actions:list_custom_image_versions_for_org',
  description:
    'List image versions of a custom image for an organization. List image versions of a custom image for an organization.',
  input: {
    type: 'object',
    properties: {
      image_definition_id: {
        type: 'integer',
        description: 'Image definition ID of custom image',
      },
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['image_definition_id', 'org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}/versions',
  },
});
