import { defineTool } from '@usemcpkit/core';

export const securityDependabotUpdateAlert = defineTool({
  name: 'security:dependabot:update_alert',
  description:
    'Update a Dependabot alert. The authenticated user must have access to security alerts for the repository to use this endpoint. For more information, see "Granting access to security alerts."',
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
      state: {
        type: 'string',
        description:
          'The state of the Dependabot alert. A `dismissed_reason` must be provided when setting the state to `dismissed`.',
        enum: ['dismissed', 'open'],
      },
      dismissed_reason: {
        type: 'string',
        description: '**Required when `state` is `dismissed`.** A reason for dismissing the alert.',
        enum: ['fix_started', 'inaccurate', 'no_bandwidth', 'not_used', 'tolerable_risk'],
      },
      dismissed_comment: {
        type: 'string',
        description: 'An optional comment associated with dismissing the alert.',
      },
      assignees: {
        type: 'array',
        description:
          'Usernames to assign to this Dependabot Alert. Pass one or more user logins to _replace_ the set of assignees on this alert. Send an empty array (`[]`) to clear all assignees from the alert. To assign an AI agent, include the bot login (for example, `copilot-swe-agent[bot]`).',
        items: {
          type: 'string',
        },
      },
      agent_assignment: {
        type: 'object',
        description:
          'Parameters for AI agent assignment. Only used when an agent bot login is included in `assignees`. Ignored when no agent is being assigned.',
        properties: {
          custom_instructions: {
            type: 'string',
            description: 'Custom instructions for the agent.',
          },
          custom_agent: {
            type: 'string',
            description: 'A custom agent identifier.',
          },
          model: {
            type: 'string',
            description: 'The model to use for the agent.',
          },
        },
      },
    },
    required: ['owner', 'repo', 'alert_number'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/dependabot/alerts/{alert_number}',
    body: ['state', 'dismissed_reason', 'dismissed_comment', 'assignees', 'agent_assignment'],
  },
});
