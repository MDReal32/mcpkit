import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsCreateIntegrationsSlackInteractions = defineTool({
  name: 'projects:integrations:create_integrations_slack_interactions',
  description: 'Process Slack interaction events. Processes interaction events from Slack',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/integrations/slack/interactions',
  },
});
