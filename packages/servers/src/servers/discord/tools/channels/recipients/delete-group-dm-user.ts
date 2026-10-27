import { defineTool } from "@usemcpkit/core";

export const channelsRecipientsDeleteGroupDmUser = defineTool({
  name: "channels:recipients:delete_group_dm_user",
  description: "",
  input: {
    type: "object",
    properties: {
      channel_id: {
        type: "string",
      },
      user_id: {
        type: "string",
      },
    },
    required: ["channel_id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/channels/{channel_id}/recipients/{user_id}",
  },
});
