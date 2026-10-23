import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentUpdateAttachmentProperties = defineTool({
  name: "cloud_v1:content:update_attachment_properties",
  description:
    "[Cloud v1] Update attachment properties. Updates the attachment properties, i.e. the non-binary data of an attachment like the filename, media-type, comment, and parent container.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content that the attachment is attached to.",
      },
      attachmentId: {
        type: "string",
        description: "The ID of the attachment to update.",
      },
      body_id: {
        type: "string",
      },
      type: {
        type: "string",
        description: 'Set this to "attachment"',
      },
      status: {
        type: "string",
      },
      title: {
        type: "string",
      },
      container: {
        type: "object",
        description:
          "Container for content. This can be either a space (containing a page or blogpost) or a page/blog post (containing an attachment or comment)",
      },
      metadata: {
        type: "object",
        properties: {
          mediaType: {
            type: "string",
          },
        },
      },
      extensions: {
        type: "object",
      },
      version: {
        type: "object",
        properties: {
          by: {
            type: "object",
          },
          when: {
            type: "string",
          },
          friendlyWhen: {
            type: "string",
          },
          message: {
            type: "string",
          },
          number: {
            type: "integer",
            description: "Set this to the current version number incremented by one",
          },
          minorEdit: {
            type: "boolean",
            description:
              "If `minorEdit` is set to 'true', no notification email or activity stream will be generated for the change.",
          },
          content: {},
          collaborators: {
            type: "object",
          },
          _expandable: {
            type: "object",
          },
          _links: {
            type: "object",
          },
          contentTypeModified: {
            type: "boolean",
            description: "True if content type is modifed in this version (e.g. page to blog)",
          },
          confRev: {
            type: "string",
            description: "The revision id provided by confluence to be used as a revision in Synchrony",
          },
          syncRev: {
            type: "string",
            description: "The revision id provided by Synchrony",
          },
          syncRevSource: {
            type: "string",
            description: "Source of the synchrony revision",
          },
        },
        required: ["minorEdit", "number", "when"],
      },
    },
    required: ["id", "attachmentId", "body_id", "type", "version"],
  },
  request: {
    method: "PUT",
    path: "/wiki/rest/api/content/{id}/child/attachment/{attachmentId}",
    body: {
      id: "body_id",
      type: "type",
      status: "status",
      title: "title",
      container: "container",
      metadata: "metadata",
      extensions: "extensions",
      version: "version",
    },
  },
});
