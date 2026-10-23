import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsListAiDuoWorkflowsListTools = defineTool({
  name: 'ai:gitlab_duo_workflows:list_ai_duo_workflows_list_tools',
  description: 'List Duo Agent Platform tools. Returns a list of all available Duo Agent Platform tools.',
  input: {
    type: 'object',
    properties: {
      workflow_definition: {
        type: 'string',
        description: 'workflow type based on its capability',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/ai/duo_workflows/list_tools',
    query: ['workflow_definition'],
  },
});
