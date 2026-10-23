import { defineTool } from '@usemcpkit/core';

export const projectsProjectsCreateProjectsAiAgentIdentities = defineTool({
  name: 'projects:projects:create_projects_ai_agent_identities',
  description:
    'Register an external agent identity. Registers a new agent identity for the current user, project, agent type, and machine fingerprint combination. Returns an existing record if one already exists. Returns 403 if the identity has been revoked.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      agent_type: {
        type: 'string',
        description: 'Type of agent being registered.',
        enum: ['claude-code', 'opencode', 'cursor', 'codex'],
      },
      machine_fingerprint: {
        type: 'string',
        description: 'SHA-256 hash of the machine identifier.',
      },
    },
    required: ['id', 'agent_type', 'machine_fingerprint'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/ai_agent/identities',
    body: ['agent_type', 'machine_fingerprint'],
  },
});
