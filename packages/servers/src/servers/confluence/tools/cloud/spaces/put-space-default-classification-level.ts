import { defineTool } from '@usemcpkit/core';

export const cloudSpacesPutSpaceDefaultClassificationLevel = defineTool({
  name: 'cloud:spaces:put_space_default_classification_level',
  description:
    '[Cloud] Update space default classification level. Update the default classification level for a specific space.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the space for which default classification level should be updated.',
      },
      body_id: {
        type: 'string',
        description: 'The ID of the classification level.',
      },
    },
    required: ['id', 'body_id'],
  },
  request: {
    method: 'PUT',
    path: '/wiki/api/v2/spaces/{id}/classification-level/default',
    body: {
      id: 'body_id',
    },
  },
});
