import { defineTool } from "@usemcpkit/core";

export const issuesResourceEventsGetProjectsMergeRequestsResourceMilestoneEvents = defineTool({
  name: "issues:resource_events:get_projects_merge_requests_resource_milestone_events",
  description:
    "Retrieve a merge request milestone event. Retrieves a specified milestone event for a project merge request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      event_id: {
        type: "string",
        description: "ID of the resource milestone event.",
      },
      eventable_id: {
        type: "string",
        description: "Internal ID of the issue or merge request.",
      },
    },
    required: ["id", "event_id", "eventable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{eventable_id}/resource_milestone_events/{event_id}",
  },
});
