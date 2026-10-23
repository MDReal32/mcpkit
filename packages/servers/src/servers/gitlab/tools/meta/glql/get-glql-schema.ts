import { defineTool } from '@usemcpkit/core';

export const metaGlqlGetGlqlSchema = defineTool({
  name: 'meta:glql:get_glql_schema',
  description:
    'Retrieve the GLQL schema. Retrieves the GLQL schema: data sources with their filter, display and sort fields, the operator, value kind and reference type vocabularies, the available functions, and the display types a query can be rendered as.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/glql/schema',
  },
});
