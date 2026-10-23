import { defineTool } from '@usemcpkit/core';

export const issuesJqlGetFieldAutoCompleteForQueryString = defineTool({
  name: 'issues:jql:get_field_auto_complete_for_query_string',
  description: 'Get field auto complete suggestions. Returns the JQL search auto complete suggestions for a field.',
  input: {
    type: 'object',
    properties: {
      fieldName: {
        type: 'string',
        description: 'The name of the field.',
      },
      fieldValue: {
        type: 'string',
        description: 'The partial field item name entered by the user.',
      },
      predicateName: {
        type: 'string',
        description:
          'The name of the CHANGED operator predicate for which the suggestions are generated. The valid predicate operators are *by*, *from*, and *to*.',
      },
      predicateValue: {
        type: 'string',
        description: 'The partial predicate item name entered by the user.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/jql/autocompletedata/suggestions',
    query: ['fieldName', 'fieldValue', 'predicateName', 'predicateValue'],
  },
});
