import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentCopyPage = defineTool({
  name: "cloud_v1:content:copy_page",
  description:
    "[Cloud v1] Copy single page. Copies a single page and its associated properties, permissions, attachments, and custom contents. The `id` path parameter refers to the content ID of the page to copy. The target of the page to be copied is defined using the `destination` in the request body and can be one of the following types.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content to expand. Maximum sub-expansions allowed is `8`. (comma-separated)",
      },
      copyAttachments: {
        type: "boolean",
        description: "If set to `true`, attachments are copied to the destination page.",
      },
      copyPermissions: {
        type: "boolean",
        description: "If set to `true`, page permissions are copied to the destination page.",
      },
      copyProperties: {
        type: "boolean",
        description: "If set to `true`, content properties are copied to the destination page.",
      },
      copyLabels: {
        type: "boolean",
        description: "If set to `true`, labels are copied to the destination page.",
      },
      copyCustomContents: {
        type: "boolean",
        description: "If set to `true`, custom contents are copied to the destination page.",
      },
      destination: {
        type: "object",
        description: "Defines where the page will be copied to, and can be one of the following types.",
        properties: {
          type: {
            type: "string",
            enum: ["space", "existing_page", "parent_page", "parent_content"],
          },
          value: {
            type: "string",
            description:
              "The space key for `space` type, and content id for `parent_page`, `parent_content`, and `existing_page`",
          },
        },
        required: ["type", "value"],
      },
      pageTitle: {
        type: "string",
        description: "If defined, this will replace the title of the destination page.",
      },
      body: {
        type: "object",
        description: "If defined, this will replace the body of the destination page.",
        properties: {
          storage: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          editor2: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
        },
      },
    },
    required: ["id", "destination"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/content/{id}/copy",
    query: ["expand"],
    body: [
      "copyAttachments",
      "copyPermissions",
      "copyProperties",
      "copyLabels",
      "copyCustomContents",
      "destination",
      "pageTitle",
      "body",
    ],
  },
});
