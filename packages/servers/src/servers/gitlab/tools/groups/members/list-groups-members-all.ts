import { defineTool } from "@usemcpkit/core";

export const groupsMembersListGroupsMembersAll = defineTool({
  name: "groups:members:list_groups_members_all",
  description:
    "List all members of a group. Lists all members of a specified group viewable by the authenticated user. Also returns inherited members from ancestor groups or invited groups. If a user is a member of this group and one or more ancestor groups, only returns the highest `access_level`. Members from an invited group are returned if the invited group is public, the requester is a member of an invited group, or the requester is a…",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      query: {
        type: "string",
        description: "Filter results by name, email, or username. Use partial values to widen the scope of the query.",
      },
      user_ids: {
        type: "string",
        description: "Filter results by the given user IDs. (comma-separated)",
      },
      show_seat_info: {
        type: "boolean",
        description: "If `true`, shows seat information for members.",
      },
      state: {
        type: "string",
        enum: ["awaiting", "active"],
        description: "Filter results by member state. Premium and Ultimate only.",
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
    path: "/groups/{id}/members/all",
    query: ["query", "user_ids", "show_seat_info", "state", "page", "per_page"],
    commaQuery: ["user_ids"],
  },
});
