import { defineTool } from "@usemcpkit/core";

export const datacenterSpaceUpdate = defineTool({
  name: "datacenter:space:update",
  description:
    "[Data Center] Update Space. Updates a Space. The incoming Space must include a Key and Name, and should include a Description",
  input: {
    type: "object",
    properties: {
      spaceKey: {
        type: "string",
        description: "the key of the space to update.",
      },
      id: {
        type: "integer",
      },
      key: {
        type: "string",
      },
      name: {
        type: "string",
      },
      status: {
        type: "string",
      },
      icon: {
        type: "object",
        properties: {
          idProperties: {
            type: "object",
          },
          expanded: {
            type: "boolean",
          },
        },
      },
      description: {
        type: "object",
      },
      homepage: {
        type: "object",
        properties: {
          idProperties: {
            type: "object",
          },
          expanded: {
            type: "boolean",
          },
        },
      },
      links: {
        type: "object",
      },
      type: {
        type: "string",
      },
      creator: {
        type: "object",
        properties: {
          profilePicture: {
            type: "object",
          },
          displayName: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
      creationDate: {
        type: "string",
      },
      lastModifier: {
        type: "object",
        properties: {
          profilePicture: {
            type: "object",
          },
          displayName: {
            type: "string",
          },
          type: {
            type: "string",
          },
        },
      },
      lastModificationDate: {
        type: "string",
      },
      metadata: {
        type: "object",
      },
      retentionPolicy: {
        type: "object",
        properties: {
          idProperties: {
            type: "object",
          },
          expanded: {
            type: "boolean",
          },
        },
      },
      permissions: {
        type: "object",
        properties: {
          idProperties: {
            type: "object",
          },
          expanded: {
            type: "boolean",
          },
        },
      },
    },
    required: ["spaceKey"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/space/{spaceKey}",
    body: [
      "id",
      "key",
      "name",
      "status",
      "icon",
      "description",
      "homepage",
      "links",
      "type",
      "creator",
      "creationDate",
      "lastModifier",
      "lastModificationDate",
      "metadata",
      "retentionPolicy",
      "permissions",
    ],
  },
});
