import { defineTool } from '@usemcpkit/core';

export const datacenterSearchList = defineTool({
  name: 'datacenter:search:list',
  description:
    '[Data Center] Search for entities in confluence. Search for entities in Confluence using the Confluence Query Language (CQL). For example:',
  input: {
    type: 'object',
    properties: {
      cqlcontext: {
        type: 'string',
        description:
          'the execution context for CQL functions, provides current space key and content id. If this is not provided some CQL functions will not be available.',
      },
      expand: {
        type: 'string',
        description:
          'the properties to expand on the search result, this may cause database requests for some properties',
      },
      includeArchivedSpaces: {
        type: 'boolean',
        description: 'whether to include content in archived spaces in the result, this defaults to false.',
      },
      limit: {
        type: 'integer',
        description: 'the limit of the number of items to return, this may be restricted by fixed system limits.',
      },
      start: {
        type: 'integer',
        description: 'he start point of the collection to return.',
      },
      excerpt: {
        type: 'string',
        description:
          'the excerpt strategy to apply to the result, one of : indexed, highlight, none. This defaults to highlight.',
      },
      cql: {
        type: 'string',
        description:
          "the CQL query see <a href='https://developer.atlassian.com/confdev/confluence-rest-api/advanced-searching-using-cql'>advanced searching in confluence using CQL</a>",
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/search',
    query: ['cqlcontext', 'expand', 'includeArchivedSpaces', 'limit', 'start', 'excerpt', 'cql'],
  },
});
