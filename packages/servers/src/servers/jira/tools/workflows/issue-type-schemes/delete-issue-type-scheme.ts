import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeSchemesDeleteIssueTypeScheme = defineTool({
  name: 'workflows:issue_type_schemes:delete_issue_type_scheme',
  description: 'Delete issue type scheme. Deletes an issue type scheme.',
  input: {
    type: 'object',
    properties: {
      issueTypeSchemeId: {
        type: 'integer',
        description: 'The ID of the issue type scheme.',
      },
    },
    required: ['issueTypeSchemeId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issuetypescheme/{issueTypeSchemeId}',
  },
});
