import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentUpdateCustomContent = defineTool({
  name: "cloud:custom_content:update_custom_content",
  description:
    "[Cloud] Update custom content. Update a custom content by id. At most one of `spaceId`, `pageId`, `blogPostId`, or `customContentId` is allowed in the request body. Note that if `spaceId` is specified, it must be the same as the `spaceId` used for creating the custom content as moving custom content to a different space is not supported.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the custom content to be updated. If you don't know the custom content ID, use Get Custom Content by Type and filter the results.",
      },
      body_id: {
        type: "string",
        description: "Id of custom content.",
      },
      type: {
        type: "string",
        description: "Type of custom content.",
      },
      status: {
        type: "string",
        description: "The status of the custom content.",
        enum: ["current"],
      },
      spaceId: {
        type: "string",
        description:
          "ID of the containing space (must be the same as the spaceId of the space the custom content was created in).",
      },
      pageId: {
        type: "string",
        description: "ID of the containing page.",
      },
      blogPostId: {
        type: "string",
        description: "ID of the containing Blog Post.",
      },
      customContentId: {
        type: "string",
        description: "ID of the containing custom content.",
      },
      title: {
        type: "string",
        description: "Title of the custom content.",
      },
      body: {
        type: "object",
        properties: {
          representation: {
            type: "string",
            description: "Type of content representation used for the value field.",
            enum: ["storage", "atlas_doc_format", "raw"],
          },
          value: {
            type: "string",
            description: "Body of the custom content, in the format found in the representation field.",
          },
          storage: {
            type: "object",
          },
          atlas_doc_format: {
            type: "object",
          },
          raw: {
            type: "object",
          },
        },
      },
      version: {
        type: "object",
        properties: {
          number: {
            type: "integer",
            description: "The version number, must be incremented by one.",
          },
          message: {
            type: "string",
            description: "An optional message to be stored with the version.",
          },
        },
      },
    },
    required: ["id", "body_id", "type", "status", "title", "body", "version"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/custom-content/{id}",
    body: {
      id: "body_id",
      type: "type",
      status: "status",
      spaceId: "spaceId",
      pageId: "pageId",
      blogPostId: "blogPostId",
      customContentId: "customContentId",
      title: "title",
      body: "body",
      version: "version",
    },
  },
});
