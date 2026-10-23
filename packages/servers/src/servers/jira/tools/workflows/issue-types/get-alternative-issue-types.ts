import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypesGetAlternativeIssueTypes = defineTool({
  name: 'workflows:issue_types:get_alternative_issue_types',
  description:
    'Get alternative issue types. Returns a list of issue types that can be used to replace the issue type. The alternative issue types are those assigned to the same workflow scheme, field configuration scheme, and screen scheme.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'The ID of the issue type.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issuetype/{id}/alternatives',
  },
});
