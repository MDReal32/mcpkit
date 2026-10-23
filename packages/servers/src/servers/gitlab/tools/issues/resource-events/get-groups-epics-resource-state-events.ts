import { defineTool } from "@usemcpkit/core";

export const issuesResourceEventsGetGroupsEpicsResourceStateEvents = defineTool({
  name: "issues:resource_events:get_groups_epics_resource_state_events",
  description: "Retrieve an epic state event. Retrieves a state event for a specified group epic.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      eventable_id: {
        type: "integer",
        description: "The ID of the epic",
      },
      event_id: {
        type: "integer",
        description: "ID of the resource state event.",
      },
    },
    required: ["id", "eventable_id", "event_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{eventable_id}/resource_state_events/{event_id}",
  },
});
