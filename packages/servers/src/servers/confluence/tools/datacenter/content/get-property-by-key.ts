import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetPropertyByKey = defineTool({
  name: 'datacenter:content:get_property_by_key',
  description: '[Data Center] Find content property by key. Returns a content property. Example request URI(s):',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
      key: {
        type: 'string',
        description: 'the key of the content property. Required.',
      },
      expand: {
        type: 'string',
        description:
          'a comma separated list of properties to expand on the content properties. Default value: <code>version</code>.',
      },
      limit: {
        type: 'string',
        description: 'the limit of the number of labels to return, this may be restricted by fixed system limits',
      },
    },
    required: ['id', 'key'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/property/{key}',
    query: ['expand', 'limit'],
  },
});
