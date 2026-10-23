import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningUpdateAlert = defineTool({
  name: 'security:secret_scanning:update_alert',
  description:
    'Update a secret scanning alert. Updates the status of a secret scanning alert in an eligible repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      alert_number: {
        type: 'integer',
        description:
          'The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation.',
      },
      state: {
        type: 'string',
        description:
          'Sets the state of the secret scanning alert. You must provide `resolution` when you set the state to `resolved`.',
        enum: ['open', 'resolved'],
      },
      resolution: {
        type: 'string',
        description: '**Required when the `state` is `resolved`.** The reason for resolving the alert.',
        enum: ['false_positive', 'wont_fix', 'revoked', 'used_in_tests'],
      },
      resolution_comment: {
        type: 'string',
        description: 'An optional comment when closing or reopening an alert. Cannot be updated or deleted.',
      },
      assignee: {
        type: 'string',
        description: 'The username of the user to assign to the alert. Set to `null` to unassign the alert.',
      },
      validity: {
        type: 'string',
        description:
          'Sets the validity of the secret scanning alert. Can be `active`, `inactive`, or `null` to clear the override.',
        enum: ['active', 'inactive'],
      },
    },
    required: ['owner', 'repo', 'alert_number'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}',
    body: ['state', 'resolution', 'resolution_comment', 'assignee', 'validity'],
  },
});
