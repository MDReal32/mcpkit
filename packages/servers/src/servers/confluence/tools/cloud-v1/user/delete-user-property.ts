import { defineTool } from "@usemcpkit/core";

export const cloudV1UserDeleteUserProperty = defineTool({
  name: "cloud_v1:user:delete_user_property",
  description:
    "[Cloud v1] Delete user property. Deletes a property for the given user. For more information about user properties, see Confluence entity properties. `Note`, these properties stored against a user are on a Confluence site level and not space/content level.",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description:
          "The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For example, 384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192",
      },
      key: {
        type: "string",
        description: "The key of the user property.",
      },
    },
    required: ["userId", "key"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/user/{userId}/property/{key}",
  },
});
