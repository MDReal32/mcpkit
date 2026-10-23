import { defineTool } from '@usemcpkit/core';

export const projectsProjectsUpdateProjectsAiAgentSessions = defineTool({
  name: 'projects:projects:update_projects_ai_agent_sessions',
  description:
    'Complete or fail an external agent session. Marks a session as completed or failed. The authenticated user must be the creator of the session.',
  input: {
    type: 'object',
    properties: {
      session_id: {
        type: 'integer',
        description: 'The session ID.',
      },
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      status: {
        type: 'string',
        description: 'Terminal status.',
        enum: ['completed', 'failed'],
      },
      jsonl_sha256: {
        type: 'string',
        description: 'SHA-256 of the transcript file.',
      },
    },
    required: ['session_id', 'id', 'status'],
  },
  request: {
    method: 'PATCH',
    path: '/projects/{id}/ai_agent/sessions/{session_id}',
    body: ['status', 'jsonl_sha256'],
  },
});
