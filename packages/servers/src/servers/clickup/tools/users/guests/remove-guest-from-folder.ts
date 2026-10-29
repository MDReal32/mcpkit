import { defineTool } from "@usemcpkit/core";

export const usersGuestsRemoveGuestFromFolder = defineTool({
  name: "users:guests:remove_guest_from_folder",
  description:
    "Remove Guest From Folder. Revoke a guest's access to a Folder. \\ \\ ***Note:** This endpoint is only available to Workspaces on our Enterprise Plan.*",
  input: {
    type: "object",
    properties: {
      folder_id: {
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
    required: ["folder_id", "guest_id"],
  },
  request: {
    method: "DELETE",
    path: "/v2/folder/{folder_id}/guest/{guest_id}",
    query: ["include_shared"],
  },
});
