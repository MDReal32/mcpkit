import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesGetIssueSecurityScheme = defineTool({
  name: 'fields:issue_security_schemes:get_issue_security_scheme',
  description: 'Get issue security scheme. Returns an issue security scheme along with its security levels.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description:
          'The ID of the issue security scheme. Use the Get issue security schemes operation to get a list of issue security scheme IDs.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuesecurityschemes/{id}',
  },
});
