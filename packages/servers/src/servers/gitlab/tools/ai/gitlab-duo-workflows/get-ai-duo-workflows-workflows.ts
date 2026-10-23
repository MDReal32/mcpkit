import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsGetAiDuoWorkflowsWorkflows = defineTool({
  name: 'ai:gitlab_duo_workflows:get_ai_duo_workflows_workflows',
  description: 'Get workflow details. Retrieves detailed information about a specific workflow by its ID.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the workflow.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/ai/duo_workflows/workflows/{id}',
  },
});
