import { defineTool } from '@usemcpkit/core';

export const workflowsIssueTypeSchemesCreateIssueTypeScheme = defineTool({
  name: 'workflows:issue_type_schemes:create_issue_type_scheme',
  description: 'Create issue type scheme. Creates an issue type scheme.',
  input: {
    type: 'object',
    properties: {
      defaultIssueTypeId: {
        type: 'string',
        description:
          'The ID of the default issue type of the issue type scheme. This ID must be included in `issueTypeIds`.',
      },
      description: {
        type: 'string',
        description: 'The description of the issue type scheme. The maximum length is 4000 characters.',
      },
      issueTypeIds: {
        type: 'array',
        description:
          'The list of issue types IDs of the issue type scheme. At least one standard issue type ID is required.',
        items: {
          type: 'string',
        },
      },
      name: {
        type: 'string',
        description:
          'The name of the issue type scheme. The name must be unique. The maximum length is 255 characters.',
      },
    },
    required: ['issueTypeIds', 'name'],
  },
  request: {
    method: 'POST',
    path: '/rest/api/2/issuetypescheme',
    body: ['defaultIssueTypeId', 'description', 'issueTypeIds', 'name'],
  },
});
