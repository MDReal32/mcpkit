import { defineTool } from "@usemcpkit/core";

export const usersAvatarsGetAvatars = defineTool({
  name: "users:avatars:get_avatars",
  description: "Get avatars. Returns the system and custom avatars for a project, issue type or priority.",
  input: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["project", "issuetype", "priority"],
        description: "The avatar type.",
      },
      entityId: {
        type: "string",
        description: "The ID of the item the avatar is associated with.",
      },
    },
    required: ["type", "entityId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/universal_avatar/type/{type}/owner/{entityId}",
  },
});
