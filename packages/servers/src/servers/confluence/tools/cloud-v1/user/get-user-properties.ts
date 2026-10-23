import { defineTool } from "@usemcpkit/core";

export const cloudV1UserGetUserProperties = defineTool({
  name: "cloud_v1:user:get_user_properties",
  description:
    "[Cloud v1] Get user properties. Returns the properties for a user as list of property keys. For more information about user properties, see Confluence entity properties. `Note`, these properties stored against a user are on a Confluence site level and not space/content level.",
  input: {
    type: "object",
    properties: {
      userId: {
        type: "string",
        description: "The account ID of the user to be queried for its properties.",
      },
      start: {
        type: "integer",
        description: "The starting index of the returned properties.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of properties to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
    required: ["userId"],
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/user/{userId}/property",
    query: ["start", "limit"],
  },
});
