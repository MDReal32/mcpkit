import { defineTool } from "@usemcpkit/core";

export const projectsHooksListGroupsHooksEvents = defineTool({
  name: "projects:hooks:list_groups_hooks_events",
  description: "List all events. Lists all events for a specified webhook.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      hook_id: {
        type: "integer",
        description: "ID of the group webhook.",
      },
      status: {
        type: "string",
        description:
          "Response status code of the events, for example `200` or `500`. You can search by status category: `successful` (200-299), `client_failure` (400-499), and `server_failure` (500-599). (comma-separated)",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
    },
    required: ["id", "hook_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/hooks/{hook_id}/events",
    query: ["status", "per_page", "page"],
    commaQuery: ["status"],
  },
});
