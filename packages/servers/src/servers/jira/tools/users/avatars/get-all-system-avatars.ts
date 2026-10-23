import { defineTool } from "@usemcpkit/core";

export const usersAvatarsGetAllSystemAvatars = defineTool({
  name: "users:avatars:get_all_system_avatars",
  description:
    "Get system avatars by type. Returns a list of system avatar details by owner type, where the owner types are issue type, project, user or priority.",
  input: {
    type: "object",
    properties: {
      type: {
        type: "string",
        enum: ["issuetype", "project", "user", "priority"],
        description: "The avatar type.",
      },
    },
    required: ["type"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/avatar/{type}/system",
  },
});
