import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsAiAgentAuditEvents = defineTool({
  name: 'projects:projects:create_projects_ai_agent_audit_events',
  description:
    'Ingest external agent audit events. Accepts a batch of up to 500 audit events for an external agent session. Events are validated, deduplicated by cloud_event_id, and enqueued for storage.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      session_id: {
        type: 'integer',
        description: 'The session ID to associate events with.',
      },
      events: {
        type: 'array',
        description: 'Batch of audit events. Maximum 500.',
        items: {
          type: 'object',
          properties: {
            event_name: {
              type: 'string',
              description: 'The audit event type.',
            },
            cloud_event_id: {
              type: 'string',
              description: 'Unique CloudEvent ID for deduplication.',
            },
            occurred_at: {
              type: 'string',
              description: 'When the event occurred (ISO 8601).',
            },
            details: {
              type: 'object',
              description: 'Additional event details.',
            },
          },
          required: ['event_name', 'cloud_event_id', 'occurred_at'],
        },
      },
    },
    required: ['id', 'session_id', 'events'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ai_agent/audit_events',
    body: ['session_id', 'events'],
  },
});
