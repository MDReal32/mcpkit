import { defineTool } from "@usemcpkit/core";

export const usersGuestsAddGuestToList = defineTool({
  name: "users:guests:add_guest_to_list",
  description:
    "Add Guest To List. Share a List with a guest. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      list_id: {
        type: "number",
      },
      guest_id: {
        type: "number",
      },
      include_shared: {
        type: "boolean",
        description:
          "Exclude details of items shared with the guest by setting this parameter to `false`. By default this parameter is set to `true`.",
      },
      permission_level: {
        type: "string",
        description: "Can be `read` (view only), `comment`, `edit`, or `create` (full).",
      },
    },
    required: ["list_id", "guest_id", "permission_level"],
  },
  request: {
    method: "POST",
    path: "/v2/list/{list_id}/guest/{guest_id}",
    query: ["include_shared"],
    body: ["permission_level"],
  },
});
