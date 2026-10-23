import { defineTool } from '@usemcpkit/core';

export const agentAutomationsListAvailableAutomationTriggers = defineTool({
  name: 'agent_automations:list_available_automation_triggers',
  description:
    'List available automation triggers. Returns the triggers available to the authenticated caller, including machine-readable schemas for their configurable fields.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/agents/automations/available-triggers',
  },
});
