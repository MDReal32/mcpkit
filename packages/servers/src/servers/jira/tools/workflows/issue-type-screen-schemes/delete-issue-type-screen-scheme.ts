import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeScreenSchemesDeleteIssueTypeScreenScheme = defineTool({
  name: 'workflows:issue_type_screen_schemes:delete_issue_type_screen_scheme',
  description: 'Delete issue type screen scheme. Deletes an issue type screen scheme.',
  input: {
    type: 'object',
    properties: {
      issueTypeScreenSchemeId: {
        type: 'string',
        description: 'The ID of the issue type screen scheme.',
      },
    },
    required: ['issueTypeScreenSchemeId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issuetypescreenscheme/{issueTypeScreenSchemeId}',
  },
});
