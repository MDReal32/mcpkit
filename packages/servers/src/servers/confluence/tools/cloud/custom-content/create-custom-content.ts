import { defineTool } from "@usemcpkit/core";

export const cloudCustomContentCreateCustomContent = defineTool({
  name: "cloud:custom_content:create_custom_content",
  description:
    "[Cloud] Create custom content. Creates a new custom content in the given space, page, blogpost or other custom content.",
  input: {
    type: "object",
    properties: {
      type: {
        type: "string",
        description: "Type of custom content.",
      },
      status: {
        type: "string",
        description: "The status of the custom content. Defaults to `current` when status not provided.",
        enum: ["current", "draft"],
      },
      spaceId: {
        type: "string",
        description: "ID of the containing space.",
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
    },
    required: ["type", "title", "body"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/custom-content",
    body: ["type", "status", "spaceId", "pageId", "blogPostId", "customContentId", "title", "body"],
  },
});
