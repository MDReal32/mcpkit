import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesGetIssueSecuritySchemes = defineTool({
  name: 'fields:issue_security_schemes:get_issue_security_schemes',
  description: 'Get issue security schemes. Returns all issue security schemes.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuesecurityschemes',
  },
});
