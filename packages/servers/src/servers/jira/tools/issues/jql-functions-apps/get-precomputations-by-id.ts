import { defineTool } from '@usemcpkit/core';

export const issuesJqlFunctionsAppsGetPrecomputationsById = defineTool({
  name: 'issues:jql_functions_apps:get_precomputations_by_id',
  description:
    'Get precomputations by ID (apps). Returns function precomputations by IDs, along with information about when they were created, updated, and last used. Each precomputation has a `value` \\- the JQL fragment to replace the custom function clause with.',
  input: {
    type: 'object',
    properties: {
      orderBy: {
        type: 'string',
        description: 'Order the results by a field:',
      },
      precomputationIDs: {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    },
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/jql/function/computation/search',
    query: ['orderBy'],
    body: ['precomputationIDs'],
  },
});
