import { defineTool } from "@usemcpkit/core";

export const issuesResourceEventsGetGroupsEpicsResourceLabelEvents = defineTool({
  name: "issues:resource_events:get_groups_epics_resource_label_events",
  description: "Retrieve an epic label event. Retrieves a label event for a specified group epic.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      event_id: {
        type: "string",
        description: "ID of the resource label event.",
      },
      eventable_id: {
        type: "string",
        description: "The ID of the epic",
      },
    },
    required: ["id", "event_id", "eventable_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{eventable_id}/resource_label_events/{event_id}",
  },
});
