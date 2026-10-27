import { defineTool } from "@usemcpkit/core";

export const tasksMembersGetListMembers = defineTool({
  name: "tasks:members:get_list_members",
  description:
    "Get List Members. Get Workspace members who have explicit access to a List. Responses do not include people with access through a Team, or people with access from the Folder or Space where the List exists.",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
    },
    required: ["list_id"],
  },
  request: {
    method: "GET",
    path: "/v2/list/{list_id}/member",
  },
});
