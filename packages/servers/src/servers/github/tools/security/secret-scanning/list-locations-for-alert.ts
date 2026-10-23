import { defineTool } from '@usemcpkit/core';

export const securitySecretScanningListLocationsForAlert = defineTool({
  name: 'security:secret_scanning:list_locations_for_alert',
  description:
    'List locations for a secret scanning alert. Lists all locations for a given secret scanning alert for an eligible repository.',
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
      page: {
        type: 'integer',
        default: 1,
        description:
          'The page number of the results to fetch. For more information, see "Using pagination in the REST API."',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description:
          'The number of results per page (max 100). For more information, see "Using pagination in the REST API."',
      },
    },
    required: ['owner', 'repo', 'alert_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations',
    query: ['page', 'per_page'],
  },
});
