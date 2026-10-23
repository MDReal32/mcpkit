import { defineTool } from "@usemcpkit/core";

export const cloudV1SpaceAddPermissionToSpace = defineTool({
  name: "cloud_v1:space:add_permission_to_space",
  description: "[Cloud v1] Add new permission to space. Adds new permission to space.",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "The key of the space to be queried for its content.",
      },
      subject: {
        type: "object",
        description: "The user or group that the permission applies to.",
        properties: {
          type: {
            type: "string",
            enum: ["user", "group"],
          },
          identifier: {
            type: "string",
            description: "for `type=user`, identifier should be user's accountId or `anonymous` for anonymous users",
          },
        },
        required: ["identifier", "type"],
      },
      operation: {
        type: "object",
        properties: {
          key: {
            type: "string",
            enum: [
              "administer",
              "archive",
              "copy",
              "create",
              "delete",
              "export",
              "move",
              "purge",
              "purge_version",
              "read",
              "restore",
              "restrict_content",
              "update",
              "use",
            ],
          },
          target: {
            type: "string",
            description: "The space or content type that the operation applies to.",
            enum: ["page", "blogpost", "comment", "attachment", "space"],
          },
        },
        required: ["key", "target"],
      },
      _links: {
        type: "object",
      },
    },
    required: ["spaceKey", "subject", "operation"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/space/{spaceKey}/permission",
    body: ["subject", "operation", "_links"],
  },
});
