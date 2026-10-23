import { defineTool } from "@usemcpkit/core";

export const cloudV1UserGetUserProperty = defineTool({
  name: "cloud_v1:user:get_user_property",
  description:
    "[Cloud v1] Get user property. Returns the property corresponding to `key` for a user. For more information about user properties, see Confluence entity properties. `Note`, these properties stored against a user are on a Confluence site level and not space/content level.",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "The account ID of the user to be queried for its properties.",
      },
      key: {
        type: "string",
        description: "The key of the user property.",
      },
    },
    required: ["userId", "key"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/user/{userId}/property/{key}",
  },
});
