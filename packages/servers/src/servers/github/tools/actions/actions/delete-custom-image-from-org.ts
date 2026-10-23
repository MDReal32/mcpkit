import { defineTool } from '@usemcpkit/core';

export const actionsActionsDeleteCustomImageFromOrg = defineTool({
  name: 'actions:actions:delete_custom_image_from_org',
  description: 'Delete a custom image from the organization. Delete a custom image from the organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      image_definition_id: {
        type: 'integer',
        description: 'Image definition ID of custom image',
      },
    },
    required: ['org', 'image_definition_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/actions/hosted-runners/images/custom/{image_definition_id}',
  },
});
