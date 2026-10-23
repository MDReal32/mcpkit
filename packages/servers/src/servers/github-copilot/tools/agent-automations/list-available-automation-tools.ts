import { defineTool } from '@usemcpkit/core';

export const agentAutomationsListAvailableAutomationTools = defineTool({
  name: 'agent_automations:list_available_automation_tools',
  description:
    'List available automation tools. Returns the tools available to the authenticated caller for use when creating or updating an automation.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/agents/automations/available-tools',
  },
});
