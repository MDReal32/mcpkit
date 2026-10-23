import { defineTool } from '@usemcpkit/core';

export const cloudClassificationLevelsGetClassificationLevels = defineTool({
  name: 'cloud:classification_levels:get_classification_levels',
  description: '[Cloud] Get list of classification levels. Returns a list of classification levels available.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/wiki/api/v2/classification-levels',
  },
});
