import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsEvents = defineTool({
  name: 'ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_events',
  description: 'Create workflow event. Creates a new event for a specified workflow execution.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the workflow.',
      },
      event_type: {
        type: 'string',
        description: 'Type of event.',
        enum: ['pause', 'resume', 'stop', 'message', 'response', 'require_input'],
      },
      message: {
        type: 'string',
        description: 'Message from the human.',
      },
      correlation_id: {
        type: 'string',
        description: 'Correlation ID for tracking events.',
      },
    },
    required: ['id', 'event_type', 'message'],
  },
  request: {
    method: 'POST',
    path: '/ai/duo_workflows/workflows/{id}/events',
    body: ['event_type', 'message', 'correlation_id'],
  },
});
