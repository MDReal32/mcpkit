import { defineTool } from '@usemcpkit/core';

export const orgsOrgsReviewPatGrantRequest = defineTool({
  name: 'orgs:orgs:review_pat_grant_request',
  description:
    'Review a request to access organization resources with a fine-grained personal access token. Approves or denies a pending request to access organization resources via a fine-grained personal access token.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      pat_request_id: {
        type: 'integer',
        description: 'Unique identifier of the request for access via fine-grained personal access token.',
      },
      action: {
        type: 'string',
        description: 'Action to apply to the request.',
        enum: ['approve', 'deny'],
      },
      reason: {
        type: 'string',
        description: 'Reason for approving or denying the request. Max 1024 characters.',
      },
    },
    required: ['org', 'pat_request_id', 'action'],
  },
  request: {
    method: 'POST',
    path: '/orgs/{org}/personal-access-token-requests/{pat_request_id}',
    body: ['action', 'reason'],
  },
});
