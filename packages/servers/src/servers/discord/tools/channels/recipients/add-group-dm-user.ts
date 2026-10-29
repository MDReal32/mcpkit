import { defineTool } from "@usemcpkit/core";

export const channelsRecipientsAddGroupDmUser = defineTool({
  name: "channels:recipients:add_group_dm_user",
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
      access_token: {
        type: "string",
      },
      nick: {
        type: "string",
      },
    },
    required: ["channel_id", "user_id"],
  },
  request: {
    method: "PUT",
    path: "/channels/{channel_id}/recipients/{user_id}",
    body: ["access_token", "nick"],
  },
});
