import { defineTool } from "@usemcpkit/core";

export const issuesResourceEventsGetProjectsIssuesResourceWeightEvents = defineTool({
  name: "issues:resource_events:get_projects_issues_resource_weight_events",
  description: "Retrieve single issue weight event. Retrieves a single weight event for a specified project issue.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      event_id: {
        type: "string",
        description: "ID of the resource weight event.",
      },
      eventable_id: {
        type: "string",
        description: "ID of the eventable.",
      },
    },
    required: ["id", "event_id", "eventable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/issues/{eventable_id}/resource_weight_events/{event_id}",
  },
});
