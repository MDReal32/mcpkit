import { defineTool } from '@usemcpkit/core';

export const dependabotGetAlert = defineTool({
  name: 'dependabot:get_alert',
  description:
    'Get a Dependabot alert. OAuth app tokens and personal access tokens (classic) need the `security_events` scope to use this endpoint. If this endpoint is only used with public repositories, the token can use the `public_repo` scope instead.',
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
          'The number that identifies a Dependabot alert in its repository. You can find this at the end of the URL for a Dependabot alert within GitHub, or in `number` fields in the response from the `GET /repos/{owner}/{repo}/dependabot/alerts` operation.',
      },
    },
    required: ['owner', 'repo', 'alert_number'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/dependabot/alerts/{alert_number}',
  },
});
