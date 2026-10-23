import { defineTool } from "@usemcpkit/core";

export const projectsProjectsCreateProjectsAiAgentSessions = defineTool({
  name: "projects:projects:create_projects_ai_agent_sessions",
  description:
    "Create an external agent session. Creates a new external agent session for the current user and project. Returns an existing record if an idempotency_key is provided and a matching session already exists.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      agent_type: {
        type: "string",
        description: "The type of agent.",
        enum: ["claude-code", "opencode", "cursor", "codex"],
      },
      agent_identity_id: {
        type: "integer",
        description: "ID of the registered agent identity.",
      },
      sync_type: {
        type: "string",
        description: "How the session was synced.",
        enum: ["hook", "fallback", "manual"],
      },
      goal: {
        type: "string",
        description: "User-provided session description.",
      },
      started_at: {
        type: "string",
        description: "Session start time, supports backfill.",
      },
      idempotency_key: {
        type: "string",
        description: "Client-generated UUID for retry safety.",
      },
      workflow_definition: {
        type: "string",
        description: "Workflow definition identifier for the session.",
      },
      glab_version: {
        type: "string",
        description: "Version of the glab binary that created the session.",
      },
      agent_version: {
        type: "string",
        description: "Version of the agent that ran the session.",
      },
    },
    required: ["id", "agent_type", "agent_identity_id", "sync_type"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/ai_agent/sessions",
    body: [
      "agent_type",
      "agent_identity_id",
      "sync_type",
      "goal",
      "started_at",
      "idempotency_key",
      "workflow_definition",
      "glab_version",
      "agent_version",
    ],
  },
});
