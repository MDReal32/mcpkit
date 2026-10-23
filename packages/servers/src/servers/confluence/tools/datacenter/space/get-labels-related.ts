import { defineTool } from '@usemcpkit/core';

export const datacenterSpaceGetLabelsRelated = defineTool({
  name: 'datacenter:space:get_labels_related',
  description:
    '[Data Center] Get related labels. Returns a paginated list of related Labels used by Content within the given Space.A Label is defined as being related to another when it is found attached to the same Content as the Label specified in the request.',
  input: {
    type: 'object',
    properties: {
      spaceKey: {
        type: 'string',
        description: 'a string containing the key of the space',
      },
      labelName: {
        type: 'string',
        description: 'a string containing the name of the label',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of labels to return, this may be restricted by fixed system limits',
      },
      start: {
        type: 'integer',
        description: 'the start point of the collection to return.',
      },
    },
    required: ['spaceKey', 'labelName'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/space/{spaceKey}/labels/{labelName}/related',
    query: ['limit', 'start'],
  },
});
