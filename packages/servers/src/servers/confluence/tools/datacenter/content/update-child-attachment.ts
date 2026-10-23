import { defineTool } from "@usemcpkit/core";

export const datacenterContentUpdateChildAttachment = defineTool({
  name: "datacenter:content:update_child_attachment",
  description:
    "[Data Center] Update non-binary data of an Attachment. Update the non-binary data of an attachment.This resource can be used to update an attachment's filename, media-type, comment, and parent container.",
  input: {
    type: "object",
    properties: {
      attachmentId: {
        type: "string",
        description: "the id of the attachment to update.",
      },
      id: {
        type: "string",
        description: "The id of the content the attachment is on.",
      },
      body_id: {
        type: "string",
      },
      type: {
        type: "string",
      },
      status: {
        type: "string",
      },
      title: {
        type: "string",
      },
      links: {
        type: "object",
      },
      space: {
        type: "object",
        properties: {
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
          },
          description: {
            type: "object",
          },
          homepage: {
            type: "object",
          },
          links: {
            type: "object",
          },
          type: {
            type: "string",
          },
          creator: {
            type: "object",
          },
          creationDate: {
            type: "string",
          },
          lastModifier: {
            type: "object",
          },
          lastModificationDate: {
            type: "string",
          },
          metadata: {
            type: "object",
          },
          retentionPolicy: {
            type: "object",
          },
          permissions: {
            type: "object",
          },
        },
      },
      history: {
        type: "object",
        properties: {
          previousVersion: {
            type: "object",
          },
          nextVersion: {
            type: "object",
          },
          lastUpdated: {
            type: "object",
          },
          latest: {
            type: "boolean",
          },
          createdBy: {
            type: "object",
          },
          createdDate: {
            type: "string",
          },
          contributors: {
            type: "object",
          },
          lastUpdatedRef: {
            type: "object",
          },
          nextVersionRef: {
            type: "object",
          },
          previousVersionRef: {
            type: "object",
          },
          contentParentRef: {
            type: "object",
          },
        },
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
          message: {
            type: "string",
          },
          number: {
            type: "integer",
          },
          minorEdit: {
            type: "boolean",
          },
          hidden: {
            type: "boolean",
          },
          syncRev: {
            type: "string",
          },
          content: {
            type: "object",
          },
          contentRef: {
            type: "object",
          },
        },
      },
      ancestors: {
        type: "array",
        items: {},
      },
      position: {
        type: "integer",
      },
      operations: {
        type: "array",
        items: {
          type: "object",
        },
      },
      children: {
        type: "object",
      },
      descendants: {
        type: "object",
      },
      container: {},
      body: {
        type: "object",
      },
      metadata: {
        type: "object",
      },
      extensions: {
        type: "object",
      },
      restrictions: {
        type: "object",
      },
      relevantViewRestrictions: {
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
      extractedTextLink: {
        type: "string",
      },
      historyRef: {
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
      spaceRef: {
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
      containerRef: {
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
      versionRef: {
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
    required: ["attachmentId", "id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/content/{id}/child/attachment/{attachmentId}",
    body: {
      id: "body_id",
      type: "type",
      status: "status",
      title: "title",
      links: "links",
      space: "space",
      history: "history",
      version: "version",
      ancestors: "ancestors",
      position: "position",
      operations: "operations",
      children: "children",
      descendants: "descendants",
      container: "container",
      body: "body",
      metadata: "metadata",
      extensions: "extensions",
      restrictions: "restrictions",
      relevantViewRestrictions: "relevantViewRestrictions",
      extractedTextLink: "extractedTextLink",
      historyRef: "historyRef",
      spaceRef: "spaceRef",
      containerRef: "containerRef",
      versionRef: "versionRef",
    },
  },
});
