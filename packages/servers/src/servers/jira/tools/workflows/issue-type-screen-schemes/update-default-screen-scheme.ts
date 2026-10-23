import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeScreenSchemesUpdateDefaultScreenScheme = defineTool({
  name: 'workflows:issue_type_screen_schemes:update_default_screen_scheme',
  description:
    'Update issue type screen scheme default screen scheme. Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all unmapped issue types.',
  input: {
    type: 'object',
    properties: {
      issueTypeScreenSchemeId: {
        type: 'string',
        description: 'The ID of the issue type screen scheme.',
      },
      screenSchemeId: {
        type: 'string',
        description: 'The ID of the screen scheme.',
      },
    },
    required: ['issueTypeScreenSchemeId', 'screenSchemeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/default',
    body: ['screenSchemeId'],
  },
});
