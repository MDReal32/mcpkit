import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetRestrictionByOperationByOperationKey = defineTool({
  name: 'datacenter:content:get_restriction_by_operation_by_operation_key',
  description:
    '[Data Center] Get all restrictions for given operation. Returns info about all restrictions of given operation.',
  input: {
    type: 'object',
    properties: {
      operationKey: {
        type: 'string',
        description: 'key of the operation.',
      },
      id: {
        type: 'string',
      },
      expand: {
        type: 'string',
        description: 'Aa comma separated list of properties to expand on the content properties. Default value: group.',
      },
      limit: {
        type: 'integer',
        description: 'pagination limit.',
      },
      start: {
        type: 'integer',
        description: 'pagination start.',
      },
    },
    required: ['operationKey', 'id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/restriction/byOperation/{operationKey}',
    query: ['expand', 'limit', 'start'],
  },
});
