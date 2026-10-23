import { defineTool } from '@usemcpkit/core';

export const issuesIssueLinkTypesUpdateIssueLinkType = defineTool({
  name: 'issues:issue_link_types:update_issue_link_type',
  description: 'Update issue link type. Updates an issue link type.',
  input: {
    type: 'object',
    properties: {
      issueLinkTypeId: {
        type: 'string',
        description: 'The ID of the issue link type.',
      },
      id: {
        type: 'string',
        description: 'The ID of the issue link type and is used as follows:',
      },
      inward: {
        type: 'string',
        description: 'The description of the issue link type inward link and is used as follows:',
      },
      name: {
        type: 'string',
        description: 'The name of the issue link type and is used as follows:',
      },
      outward: {
        type: 'string',
        description: 'The description of the issue link type outward link and is used as follows:',
      },
      self: {
        type: 'string',
        description: 'The URL of the issue link type. Read only.',
      },
    },
    required: ['issueLinkTypeId'],
  },
  request: {
    method: 'PUT',
    path: '/rest/api/2/issueLinkType/{issueLinkTypeId}',
    body: ['id', 'inward', 'name', 'outward', 'self'],
  },
});
