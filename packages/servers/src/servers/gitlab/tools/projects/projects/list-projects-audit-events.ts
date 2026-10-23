import { defineTool } from "@usemcpkit/core";

export const projectsProjectsListProjectsAuditEvents = defineTool({
  name: "projects:projects:list_projects_audit_events",
  description: "List all project audit events. Lists all audit events for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      created_after: {
        type: "string",
        description: "Return project audit events created on or after the specified time.",
      },
      created_before: {
        type: "string",
        description: "Return project audit events created on or before the specified time.",
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
    path: "/projects/{id}/audit_events",
    query: ["created_after", "created_before", "page", "per_page"],
  },
});
