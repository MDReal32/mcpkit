import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetHistoryMacroHash = defineTool({
  name: 'datacenter:content:get_history_macro_hash',
  description:
    '[Data Center] [Deprecated] Get macro body by hash. Returns the body of a macro (in storage format) with the given hash. This resource is primarily used by connect applications that require the body of macro to perform their work.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'the id of the content.',
      },
      version: {
        type: 'integer',
        description: 'the version of the content which the hash belongs.',
      },
      hash: {
        type: 'string',
        description: 'the macroId to find the correct macro.',
      },
    },
    required: ['id', 'version', 'hash'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/{id}/history/{version}/macro/hash/{hash}',
  },
});
