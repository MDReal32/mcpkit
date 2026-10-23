import { defineTool } from '@usemcpkit/core';

export const issuesJqlFunctionsAppsGetPrecomputations = defineTool({
  name: 'issues:jql_functions_apps:get_precomputations',
  description:
    "Get precomputations (apps). Returns the list of a function's precomputations along with information about when they were created, updated, and last used. Each precomputation has a `value` \\- the JQL fragment to replace the custom function clause with.",
  input: {
    type: 'object',
    properties: {
      functionKey: {
        type: 'string',
        description: 'The function key in format: (comma-separated)',
      },
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 100,
        description: 'The maximum number of items to return per page.',
      },
      orderBy: {
        type: 'string',
        description: 'Order the results by a field:',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/jql/function/computation',
    query: ['functionKey', 'startAt', 'maxResults', 'orderBy'],
  },
});
