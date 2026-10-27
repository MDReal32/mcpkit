import { defineTool } from "@usemcpkit/core";

export const channelsPermissionsSetChannelPermissionOverwrite = defineTool({
  name: "channels:permissions:set_channel_permission_overwrite",
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
      type: {},
      allow: {
        type: "integer",
      },
      deny: {
        type: "integer",
      },
    },
    required: ["channel_id", "overwrite_id"],
  },
  request: {
    method: "PUT",
    path: "/channels/{channel_id}/permissions/{overwrite_id}",
    body: ["type", "allow", "deny"],
  },
});
