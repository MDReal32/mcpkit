import { defineTool } from '@usemcpkit/core';

export const projectsIntegrationsCreateIntegrationsSlackOptions = defineTool({
  name: 'projects:integrations:create_integrations_slack_options',
  description: 'Get Slack interactive component options. Retrieves options for Slack interactive components',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'POST',
    path: '/integrations/slack/options',
  },
});
