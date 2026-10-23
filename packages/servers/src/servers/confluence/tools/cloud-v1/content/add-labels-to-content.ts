import { defineTool } from '@usemcpkit/core';

export const cloudV1ContentAddLabelsToContent = defineTool({
  name: 'cloud_v1:content:add_labels_to_content',
  description:
    '[Cloud v1] Add labels to content. Adds labels to a piece of content. Does not modify the existing labels.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the content that will have labels added to it.',
      },
      prefix: {
        type: 'string',
        description: 'The prefix for the label. `global`, `my` `team`, etc.',
      },
      name: {
        type: 'string',
        description: 'The name of the label, which will be shown in the UI.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'POST',
    path: '/wiki/rest/api/content/{id}/label',
    body: ['prefix', 'name'],
  },
});
