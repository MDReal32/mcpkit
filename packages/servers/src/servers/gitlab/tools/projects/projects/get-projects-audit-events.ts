import { defineTool } from "@usemcpkit/core";

export const projectsProjectsGetProjectsAuditEvents = defineTool({
  name: "projects:projects:get_projects_audit_events",
  description:
    "Retrieve a project audit event. Retrieves an audit event for a specified project. Only available to users with at least the Developer role for the project.",
  input: {
    type: "object",
    properties: {
      audit_event_id: {
        type: "integer",
        description: "ID of the audit event.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["audit_event_id", "id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/audit_events/{audit_event_id}",
  },
});
