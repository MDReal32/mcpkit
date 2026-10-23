import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesGetSecurityLevels = defineTool({
  name: 'fields:issue_security_schemes:get_security_levels',
  description: 'Get issue security levels. Returns a paginated list of issue security levels.',
  input: {
    type: 'object',
    properties: {
      startAt: {
        type: 'string',
        default: '0',
        description: 'The index of the first item to return in a page of results (page offset).',
      },
      maxResults: {
        type: 'string',
        default: '50',
        description: 'The maximum number of items to return per page.',
      },
      id: {
        type: 'string',
        description:
          'The list of issue security scheme level IDs. To include multiple issue security levels, separate IDs with an ampersand: `id=10000&id=10001`. (comma-separated)',
      },
      schemeId: {
        type: 'string',
        description:
          'The list of issue security scheme IDs. To include multiple issue security schemes, separate IDs with an ampersand: `schemeId=10000&schemeId=10001`. (comma-separated)',
      },
      onlyDefault: {
        type: 'boolean',
        default: false,
        description:
          'When set to true, returns multiple default levels for each security scheme containing a default. If you provide scheme and level IDs not associated with the default, returns an empty page. The default value is false.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuesecurityschemes/level',
    query: ['startAt', 'maxResults', 'id', 'schemeId', 'onlyDefault'],
  },
});
