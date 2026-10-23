import { defineTool } from '@usemcpkit/core';

export const issuesIssueLinkTypesGetIssueLinkType = defineTool({
  name: 'issues:issue_link_types:get_issue_link_type',
  description: 'Get issue link type. Returns an issue link type.',
  input: {
    type: 'object',
    properties: {
      issueLinkTypeId: {
        type: 'string',
        description: 'The ID of the issue link type.',
      },
    },
    required: ['issueLinkTypeId'],
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/issueLinkType/{issueLinkTypeId}',
  },
});
