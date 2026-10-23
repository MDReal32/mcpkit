import { defineTool } from "@usemcpkit/core";

export const usersUserPropertiesSetUserProperty = defineTool({
  name: "users:user_properties:set_user_property",
  description:
    "Set user property. Sets the value of a user's property. Use this resource to store custom data against a user.",
  input: {
    type: "object",
    properties: {
      propertyKey: {
        type: "string",
        description: "The key of the user's property. The maximum length is 255 characters.",
      },
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
      body: {},
    },
    required: ["propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/user/properties/{propertyKey}",
    query: ["accountId", "userKey", "username"],
    bodyArg: "body",
  },
});
