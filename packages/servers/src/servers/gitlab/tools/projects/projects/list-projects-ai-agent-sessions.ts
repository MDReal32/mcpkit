import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsAiAgentSessions = defineTool({
  name: "projects:projects:list_projects_ai_agent_sessions",
  description:
    "List external agent sessions for a project. Returns a paginated list of external agent sessions for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      agent_type: {
        type: "string",
        enum: ["claude-code", "opencode", "cursor", "codex"],
        description: "Filter by agent type.",
      },
      status: {
        type: "string",
        enum: ["created", "running", "finished", "failed", "stopped"],
        description: "Filter by status.",
      },
      created_after: {
        type: "string",
        description: "Filter sessions created after this time.",
      },
      created_before: {
        type: "string",
        description: "Filter sessions created before this time.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/ai_agent/sessions",
    query: ["agent_type", "status", "created_after", "created_before", "page", "per_page"],
  },
});
