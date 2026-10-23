import { defineTool } from "@usemcpkit/core";

export const usersUserPropertiesGetUserPropertyKeys = defineTool({
  name: "users:user_properties:get_user_property_keys",
  description: "Get user property keys. Returns the keys of all properties for a user.",
  input: {
    type: "object",
    properties: {
      accountId: {
        type: "string",
        description:
          "The account ID of the user, which uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*.",
      },
      userKey: {
        type: "string",
        description:
          "This parameter is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
      },
      username: {
        type: "string",
        description:
          "This parameter is no longer available and will be removed from the documentation soon. See the deprecation notice for details.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/user/properties",
    query: ["accountId", "userKey", "username"],
  },
});
