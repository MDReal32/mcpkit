import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsAuditEvents = defineTool({
  name: 'ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_audit_events',
  description: 'Ingest AI audit events from Duo Workflow Service',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the workflow.',
      },
      events: {
        type: 'array',
        description: 'Array of CloudEvents v1.0 envelopes.',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID of the CloudEvent, as a UUID.',
            },
            type: {
              type: 'string',
              description: 'Type of the event, for example `ai_llm_input_sent`.',
            },
            source: {
              type: 'string',
              description: 'CloudEvent source.',
            },
            time: {
              type: 'string',
              description: 'Event timestamp from the gateway.',
            },
            data: {
              type: 'object',
              description: 'Event-specific payload.',
            },
          },
          required: ['id', 'type', 'source', 'time'],
        },
      },
    },
    required: ['id', 'events'],
  },
  request: {
    method: 'POST',
    path: '/ai/duo_workflows/workflows/{id}/audit_events',
    body: ['events'],
  },
});
