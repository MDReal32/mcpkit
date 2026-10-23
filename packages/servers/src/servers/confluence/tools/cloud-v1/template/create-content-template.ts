import { defineTool } from "@usemcpkit/core";

export const cloudV1TemplateCreateContentTemplate = defineTool({
  name: "cloud_v1:template:create_content_template",
  description:
    "[Cloud v1] Create content template. Creates a new content template. Note, blueprint templates cannot be created via the REST API.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the new template.",
      },
      templateType: {
        type: "string",
        description: "The type of the new template. Set to `page`.",
      },
      body: {
        type: "object",
        description:
          "The body of the new content. Does not apply to attachments. Only one body format should be specified as the property for this object, e.g. `storage`.",
        properties: {
          view: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          export_view: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          styled_view: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          storage: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          editor: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          editor2: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          wiki: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          atlas_doc_format: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
          anonymous_export_view: {
            type: "object",
            description: "This object is used when creating or updating content.",
          },
        },
      },
      description: {
        type: "string",
        description: "A description of the new template.",
      },
      labels: {
        type: "array",
        description: "Labels for the new template.",
        items: {
          type: "object",
        },
      },
      space: {
        type: "object",
        description:
          "The key for the space of the new template. Only applies to space templates. If the spaceKey is not specified, the template will be created as a global template.",
        properties: {
          key: {
            type: "string",
          },
        },
        required: ["key"],
      },
    },
    required: ["name", "templateType", "body"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/template",
    body: ["name", "templateType", "body", "description", "labels", "space"],
  },
});
