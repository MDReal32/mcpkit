import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsGetAiDuoWorkflowsWs = defineTool({
  name: 'ai:gitlab_duo_workflows:get_ai_duo_workflows_ws',
  description:
    'Get Duo Workflows WebSocket connection details. Retrieves WebSocket connection information to establish a session with Duo Workflows.',
  input: {
    type: 'object',
    properties: {
      workflow_id: {
        type: 'string',
        description:
          'ID of the existing workflow. When provided and the workflow has a stored model selection, that selection is reused to ensure provider stickiness.',
      },
      environment: {
        type: 'string',
        description:
          'Environment the session runs in. Used to resolve tool governance when the client connects before sending workflow_id. Only `ide`, `chat`, and `chat_partial` affect tool governance. Any other value falls back to `web`.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/ai/duo_workflows/ws',
    query: ['workflow_id', 'environment'],
  },
});
