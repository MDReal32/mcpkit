import { defineTool } from "@usemcpkit/core";

export const channelsPermissionsDeleteChannelPermissionOverwrite = defineTool({
  name: "channels:permissions:delete_channel_permission_overwrite",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      overwrite_id: {
        type: "string",
      },
    },
    required: ["channel_id", "overwrite_id"],
  },
  request: {
    method: "DELETE",
    path: "/channels/{channel_id}/permissions/{overwrite_id}",
  },
});
