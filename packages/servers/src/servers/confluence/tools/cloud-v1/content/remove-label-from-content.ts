import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentRemoveLabelFromContent = defineTool({
  name: 'cloud_v1:content:remove_label_from_content',
  description:
    "[Cloud v1] Remove label from content. Removes a label from a piece of content. Labels can't be deleted from archived content. This is similar to Remove label from content using query parameter except that the label name is specified via a path parameter.",
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content that the label will be removed from.',
      },
      label: {
        type: 'string',
        description: 'The name of the label to be removed.',
      },
    },
    required: ['id', 'label'],
  },
  request: {
    method: 'DELETE',
    path: '/wiki/rest/api/content/{id}/label/{label}',
  },
});
