import { defineTool } from "@usemcpkit/core";

export const issuesResourceEventsGetProjectsMergeRequestsResourceLabelEvents = defineTool({
  name: "issues:resource_events:get_projects_merge_requests_resource_label_events",
  description: "Retrieve a merge request label event. Retrieves a label event for a specified project merge request.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      event_id: {
        type: "string",
        description: "ID of the resource label event.",
      },
      eventable_id: {
        type: "string",
        description: "The IID of the merge request",
      },
    },
    required: ["id", "event_id", "eventable_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/merge_requests/{eventable_id}/resource_label_events/{event_id}",
  },
});
