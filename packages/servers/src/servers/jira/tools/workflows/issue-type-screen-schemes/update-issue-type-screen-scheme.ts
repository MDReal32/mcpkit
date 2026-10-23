import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeScreenSchemesUpdateIssueTypeScreenScheme = defineTool({
  name: 'workflows:issue_type_screen_schemes:update_issue_type_screen_scheme',
  description: 'Update issue type screen scheme. Updates an issue type screen scheme.',
  input: {
    type: 'object',
    properties: {
      issueTypeScreenSchemeId: {
        type: 'string',
        description: 'The ID of the issue type screen scheme.',
      },
      description: {
        type: 'string',
        description: 'The description of the issue type screen scheme. The maximum length is 255 characters.',
      },
      name: {
        type: 'string',
        description:
          'The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters.',
      },
    },
    required: ['issueTypeScreenSchemeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issuetypescreenscheme/{issueTypeScreenSchemeId}',
    body: ['description', 'name'],
  },
});
