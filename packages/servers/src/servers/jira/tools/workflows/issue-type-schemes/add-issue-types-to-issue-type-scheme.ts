import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeSchemesAddIssueTypesToIssueTypeScheme = defineTool({
  name: 'workflows:issue_type_schemes:add_issue_types_to_issue_type_scheme',
  description: 'Add issue types to issue type scheme. Adds issue types to an issue type scheme.',
  input: {
    type: 'object',
    properties: {
      issueTypeSchemeId: {
        type: 'integer',
        description: 'The ID of the issue type scheme.',
      },
      issueTypeIds: {
        type: 'array',
        description: 'The list of issue type IDs.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['issueTypeSchemeId', 'issueTypeIds'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issuetypescheme/{issueTypeSchemeId}/issuetype',
    body: ['issueTypeIds'],
  },
});
