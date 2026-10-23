import { defineTool } from '@usemcpkit/core';

export const actionsListCustomImagesForOrg = defineTool({
  name: 'actions:list_custom_images_for_org',
  description: 'List custom images for an organization. List custom images for an organization.',
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
    path: '/orgs/{org}/actions/hosted-runners/images/custom',
  },
});
