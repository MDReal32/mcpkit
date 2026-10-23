import { defineTool } from '@usemcpkit/core';

export const copilotAgentAutomationsListAutomations = defineTool({
  name: 'copilot:agent_automations:list_automations',
  description:
    'List automations for user. Returns automations whose `created_by` user is the authenticated caller, across repositories the caller can read. This includes both user-owned and repository-owned automations created by the caller but excludes repository-owned automations created by someone else even if the caller has write access to the repository.',
  input: {
    type: 'object',
    properties: {
      page: {
        type: 'integer',
        default: 1,
        description: 'The page number of the results to fetch.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description: 'The number of results per page (max 100).',
      },
      owner_type: {
        type: 'string',
        enum: ['user', 'repository'],
        description:
          'Filter automations by owner type. `user` returns automations owned by their creator, `repository` returns automations owned by the repository. Omit to return both.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/agents/automations',
    query: ['page', 'per_page', 'owner_type'],
  },
});
