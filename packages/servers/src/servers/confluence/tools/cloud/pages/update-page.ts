import { defineTool } from "@usemcpkit/core";

export const cloudPagesUpdatePage = defineTool({
  name: "cloud:pages:update_page",
  description: "[Cloud] Update page. Update a page by id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the page to be updated. If you don't know the page ID, use Get Pages and filter the results.",
      },
      body_id: {
        type: "string",
        description: "Id of the page.",
      },
      status: {
        type: "string",
        description: "The updated status of the page.",
        enum: ["current", "draft"],
      },
      title: {
        type: "string",
        description: "Title of the page.",
      },
      spaceId: {
        description: "ID of the containing space.",
      },
      parentId: {
        description: "ID of the parent content.",
      },
      ownerId: {
        description: "Account ID of the page owner.",
      },
      body: {
        type: "object",
        properties: {
          representation: {
            type: "string",
            description: "Type of content representation used for the value field.",
            enum: ["storage", "atlas_doc_format", "wiki"],
          },
          value: {
            type: "string",
            description: "Body of the page, in the format found in the representation field.",
          },
          storage: {
            type: "object",
          },
          atlas_doc_format: {
            type: "object",
          },
          wiki: {
            type: "object",
          },
        },
      },
      version: {
        type: "object",
        properties: {
          number: {
            type: "integer",
            description:
              "The new version of the updated page. Set this to the current version number plus one, unless you are updating the status to 'draft' which requires a version number of 1.",
          },
          message: {
            type: "string",
            description: "An optional message to be stored with the version.",
          },
        },
      },
    },
    required: ["id", "body_id", "status", "title", "body", "version"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/pages/{id}",
    body: {
      id: "body_id",
      status: "status",
      title: "title",
      spaceId: "spaceId",
      parentId: "parentId",
      ownerId: "ownerId",
      body: "body",
      version: "version",
    },
  },
});
