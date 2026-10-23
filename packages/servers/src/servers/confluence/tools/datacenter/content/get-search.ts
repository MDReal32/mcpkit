import { defineTool } from '@usemcpkit/core';

export const datacenterContentGetSearch = defineTool({
  name: 'datacenter:content:get_search',
  description:
    '[Data Center] Search content using CQL. Fetch a list of content using the Confluence Query Language (CQL). See: Advanced searching using CQL',
  input: {
    type: 'object',
    properties: {
      cqlcontext: {
        type: 'string',
        description: 'the context to execute a cql search in, this is the json serialized form of SearchContext',
      },
      xoauth_requestor_id: {
        type: 'string',
      },
      expand: {
        type: 'string',
        description:
          'a comma separated list of properties to expand on the content. Default value: <code>history,space,version</code>.',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of items to return, this may be restricted by fixed system limits.',
      },
      start: {
        type: 'integer',
        description: 'the start point of the collection to return.',
      },
      cql: {
        type: 'string',
        description: 'a cql query string to use to locate content.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/content/search',
    query: ['cqlcontext', 'xoauth_requestor_id', 'expand', 'limit', 'start', 'cql'],
  },
});
