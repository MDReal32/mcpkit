import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsCreateSlackTrigger = defineTool({
  name: 'projects:integrations:create_slack_trigger',
  description: 'Trigger a global slack command. Triggers a global slack command.',
  input: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
        description: 'Text of the Slack command.',
      },
    },
    required: ['text'],
  },
  request: {
    method: 'POST',
    path: '/slack/trigger',
    body: ['text'],
  },
});
