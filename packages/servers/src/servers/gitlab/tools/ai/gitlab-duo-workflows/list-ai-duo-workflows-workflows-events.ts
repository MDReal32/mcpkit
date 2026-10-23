import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsListAiDuoWorkflowsWorkflowsEvents = defineTool({
  name: 'ai:gitlab_duo_workflows:list_ai_duo_workflows_workflows_events',
  description: 'List all workflow events. Retrieves a list of all events associated with a specific workflow.',
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
    path: '/ai/duo_workflows/workflows/{id}/events',
  },
});
