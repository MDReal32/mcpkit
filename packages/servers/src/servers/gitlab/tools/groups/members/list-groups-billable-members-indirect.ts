import { defineTool } from "@usemcpkit/core";

export const groupsMembersListGroupsBillableMembersIndirect = defineTool({
  name: "groups:members:list_groups_billable_members_indirect",
  description:
    "List all indirect memberships for a billable group member. Lists all indirect memberships for a billable member of a group. This operation works on top-level groups only. It does not work on subgroups.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      user_id: {
        type: "integer",
        description: "ID of the user.",
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
    required: ["id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/billable_members/{user_id}/indirect",
    query: ["page", "per_page"],
  },
});
