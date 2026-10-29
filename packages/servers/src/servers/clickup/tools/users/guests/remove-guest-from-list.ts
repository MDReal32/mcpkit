import { defineTool } from "@usemcpkit/core";

export const usersGuestsRemoveGuestFromList = defineTool({
  name: "users:guests:remove_guest_from_list",
  description:
    "Remove Guest From List. Revoke a guest's access to a List.\\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
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
    },
    required: ["list_id", "guest_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/list/{list_id}/guest/{guest_id}",
    query: ["include_shared"],
  },
});
