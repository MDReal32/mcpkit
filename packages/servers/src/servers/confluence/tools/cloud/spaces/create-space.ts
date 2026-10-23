import { defineTool } from "@usemcpkit/core";

export const cloudSpacesCreateSpace = defineTool({
  name: "cloud:spaces:create_space",
  description: "[Cloud] Create space. Creates a Space as specified in the payload.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the space to be created.",
      },
      key: {
        type: "string",
        description:
          "The key for the new space. See Space Keys. If the key property is not provided, the alias property is required to be used instead.",
      },
      alias: {
        type: "string",
        description:
          "This field will be used as the new identifier for the space in confluence page URLs. If the alias property is not provided, the key property is required to be used instead. Maximum 255 alphanumeric characters in length.",
      },
      description: {
        type: "object",
        description:
          "The description of the new/updated space. Note, only the 'plain' representation is currently supported.",
        properties: {
          value: {
            type: "string",
            description: "The space description.",
          },
          representation: {
            type: "string",
            description: "The format of the description.",
          },
        },
      },
      roleAssignments: {
        type: "array",
        items: {
          type: "object",
          description:
            "The role assignments for the new space. If none are provided, the Default Space Roles are applied. If roles are provided, the space is created with exactly the provided set of roles. A private space is created if only the creator is assigned to a role and it’s the Admin role. At least one Admin role assignment must be specified.",
        },
      },
      copySpaceAccessConfiguration: {
        type: "integer",
        description: "The id of the space to copy the space access configuration from.",
      },
      createPrivateSpace: {
        type: "boolean",
        description: "Whether to create the space as private.",
      },
      templateKey: {
        type: "string",
        description: "The key of the template to use.",
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/spaces",
    body: [
      "name",
      "key",
      "alias",
      "description",
      "roleAssignments",
      "copySpaceAccessConfiguration",
      "createPrivateSpace",
      "templateKey",
    ],
  },
});
