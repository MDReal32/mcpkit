import { defineTool } from '@usemcpkit/core';

export const datacenterLabelGetLabels = defineTool({
  name: 'datacenter:label:get_labels',
  description:
    '[Data Center] Get list of labels matching the given label name, namespace, space (via space key) or owner. Returns a paginated list of labels matching the given label name, namespace, space (via space key) or owner. Leave query params empty to ignore.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'The spaceKey to restrict by.',
      },
      owner: {
        type: 'string',
        description: 'The owner of the labels.',
      },
      start: {
        type: 'integer',
        description: 'The start point of the collection to return.',
      },
      limit: {
        type: 'integer',
        description: 'The limit of the number of labels to return, this may be restricted by fixed system limit.',
      },
      namespace: {
        type: 'string',
        description: 'The namespace of the labels.',
      },
      labelName: {
        type: 'string',
        description: 'The name of the label (excluding any prefix)',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/label/labels',
    query: ['spaceKey', 'owner', 'start', 'limit', 'namespace', 'labelName'],
  },
});
