import { defineTool } from '@usemcpkit/core';

export const fieldsIssueSecuritySchemesRemoveMemberFromSecurityLevel = defineTool({
  name: 'fields:issue_security_schemes:remove_member_from_security_level',
  description:
    'Remove member from issue security level. Removes an issue security level member from an issue security scheme.',
  input: {
    type: 'object',
    properties: {
      schemeId: {
        type: 'string',
        description: 'The ID of the issue security scheme.',
      },
      levelId: {
        type: 'string',
        description: 'The ID of the issue security level.',
      },
      memberId: {
        type: 'string',
        description: 'The ID of the issue security level member to be removed.',
      },
    },
    required: ['schemeId', 'levelId', 'memberId'],
  },
  request: {
    method: 'DELETE',
    path: '/rest/api/2/issuesecurityschemes/{schemeId}/level/{levelId}/member/{memberId}',
  },
});
