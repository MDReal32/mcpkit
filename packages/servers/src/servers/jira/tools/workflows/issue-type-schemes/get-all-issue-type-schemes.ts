import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeSchemesGetAllIssueTypeSchemes = defineTool({
  name: 'workflows:issue_type_schemes:get_all_issue_type_schemes',
  description: 'Get all issue type schemes. Returns a paginated list of issue type schemes.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'integer',
        default: 0,
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'integer',
        default: 50,
        description: 'The maximum number of items to return per page.',
      },
      id: {
        type: 'string',
        description:
          'The list of issue type schemes IDs. To include multiple IDs, provide an ampersand-separated list. For example, `id=10000&id=10001`. (comma-separated)',
      },
      orderBy: {
        type: 'string',
        default: 'id',
        enum: ['name', '-name', '+name', 'id', '-id', '+id'],
        description: 'Order the results by a field:',
      },
      expand: {
        type: 'string',
        default: '',
        description:
          'Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:',
      },
      queryString: {
        type: 'string',
        default: '',
        description: 'String used to perform a case-insensitive partial match with issue type scheme name.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuetypescheme',
    query: ['startAt', 'maxResults', 'id', 'orderBy', 'expand', 'queryString'],
  },
});
