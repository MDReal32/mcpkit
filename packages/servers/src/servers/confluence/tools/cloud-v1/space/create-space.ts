import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceCreateSpace = defineTool({
  name: "cloud_v1:space:create_space",
  description:
    "[Cloud v1] Create space. Creates a new space. Note, currently you cannot set space labels when creating a space.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the new space.",
      },
      key: {
        type: "string",
        description: "The key for the new space. Format: See Space keys. If `alias` is not provided, this is required.",
      },
      alias: {
        type: "string",
        description:
          "This field will be used as the new identifier for the space in confluence page URLs. If the property is not provided the alias will be the provided key. This property is experimental and may be changed or removed in the future.",
      },
      description: {
        type: "object",
        description:
          "The description of the new/updated space. Note, only the 'plain' representation can be used for the description when creating or updating a space.",
        properties: {
          plain: {
            type: "object",
          },
        },
        required: ["plain"],
      },
      permissions: {
        type: "array",
        description:
          "The permissions for the new space. If no permissions are provided, the Confluence default space permissions are applied. Note that if permissions are provided, the space is created with only the provided set of permissions, not including the default space permissions. Space permissions can be modified after creation using the space permissions endpoints, and a private space can be created using t…",
        items: {
          type: "object",
          description:
            "This object represents a permission for given space. Permissions consist of at least one operation object with an accompanying subjects object.",
        },
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/space",
    body: ["name", "key", "alias", "description", "permissions"],
  },
});
