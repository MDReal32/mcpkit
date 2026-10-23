import { defineTool } from "@usemcpkit/core";

export const cloudPagesCreatePage = defineTool({
  name: "cloud:pages:create_page",
  description: "[Cloud] Create page. Creates a page in the space.",
  input: {
    type: "object",
    properties: {
      embedded: {
        type: "boolean",
        description: "Tag the content as embedded and content will be created in NCS.",
      },
      private: {
        type: "boolean",
        description:
          "The page will be private. Only the user who creates this page will have permission to view and edit one.",
      },
      root_level: {
        type: "boolean",
        description:
          "The page will be created at the root level of the space (outside the space homepage tree). If true, then a value may not be supplied for the `parentId` body parameter.",
      },
      spaceId: {
        type: "string",
        description: "ID of the space.",
      },
      status: {
        type: "string",
        description: "The status of the page, published or draft.",
        enum: ["current", "draft"],
      },
      title: {
        type: "string",
        description: "Title of the page, required if page status is not draft.",
      },
      parentId: {
        type: "string",
        description:
          "The parent content ID of the page. If the `root-level` query parameter is set to false and a value is not supplied for this parameter, then the space homepage's ID will be used. If the `root-level` query parameter is set to true, then a value may not be supplied for this parameter.",
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
      subtype: {
        type: "string",
        description:
          "The subtype of the page. Provide the subtype live to create a live doc or no subtype to create a page.",
        enum: ["live"],
      },
    },
    required: ["spaceId"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/pages",
    query: {
      embedded: "embedded",
      private: "private",
      "root-level": "root_level",
    },
    body: ["spaceId", "status", "title", "parentId", "body", "subtype"],
  },
});
