import { defineTool } from '@usemcpkit/core';

export const secretScanningGetAlert = defineTool({
  name: 'secret_scanning:get_alert',
  description: 'Get a secret scanning alert. Gets a single secret scanning alert detected in an eligible repository.',
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
      hide_secret: {
        type: 'boolean',
        default: false,
        description: 'A boolean value representing whether or not to hide literal secrets in the results.',
      },
    },
    required: ['owner', 'repo', 'alert_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}',
    query: ['hide_secret'],
  },
});
