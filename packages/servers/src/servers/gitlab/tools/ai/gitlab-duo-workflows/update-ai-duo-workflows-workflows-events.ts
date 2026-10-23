import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsUpdateAiDuoWorkflowsWorkflowsEvents = defineTool({
  name: 'ai:gitlab_duo_workflows:update_ai_duo_workflows_workflows_events',
  description: 'Update workflow event. Updates an existing event for a specified workflow.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the workflow.',
      },
      event_id: {
        type: 'integer',
        description: 'ID of the event.',
      },
      event_status: {
        type: 'string',
        description: 'Status of the event.',
        enum: ['queued', 'delivered'],
      },
    },
    required: ['id', 'event_id', 'event_status'],
  },
  request: {
    method: 'PUT',
    path: '/ai/duo_workflows/workflows/{id}/events/{event_id}',
    body: ['event_status'],
  },
});
