import { defineTool } from "@usemcpkit/core";

export const datacenterAdminCreateSpacePersonal = defineTool({
  name: "datacenter:admin:create_space_personal",
  description: "[Data Center] Creates personal Space for a User. Creates a personal space for a user.",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "the username of the user to create personal space for.",
      },
      description: {
        type: "object",
      },
      isPrivate: {
        type: "boolean",
      },
      private: {
        type: "boolean",
      },
    },
    required: ["username"],
  },
  request: {
    method: "POST",
    path: "/rest/api/admin/space/personal/{username}",
    body: ["description", "isPrivate", "private"],
  },
});
