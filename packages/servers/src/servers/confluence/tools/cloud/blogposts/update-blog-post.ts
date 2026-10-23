import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsUpdateBlogPost = defineTool({
  name: "cloud:blogposts:update_blog_post",
  description: "[Cloud] Update blog post. Update a blog post by id.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description:
          "The ID of the blog post to be updated. If you don't know the blog post ID, use Get Blog Posts and filter the results.",
      },
      body_id: {
        type: "string",
        description: "Id of the blog post.",
      },
      status: {
        type: "string",
        description: "The updated status of the blog post.",
        enum: ["current", "draft"],
      },
      title: {
        type: "string",
        description: "Title of the blog post.",
      },
      spaceId: {
        type: "string",
        description: "ID of the containing space.",
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
            description: "Body of the blog post, in the format found in the representation field.",
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
              "The new version number of the updated blog post. Set this to the current version number plus one, unless you are updating the status to 'draft' which requires a version number of 1.",
          },
          message: {
            type: "string",
            description: "An optional message to be stored with the version.",
          },
        },
      },
      createdAt: {
        type: "string",
        description: 'Created date of the blog post in the format of "yyyy-MM-ddTHH:mm:ss.SSSZ".',
      },
    },
    required: ["id", "body_id", "status", "title", "body", "version"],
  },
  request: {
    method: "PUT",
    path: "/wiki/api/v2/blogposts/{id}",
    body: {
      id: "body_id",
      status: "status",
      title: "title",
      spaceId: "spaceId",
      body: "body",
      version: "version",
      createdAt: "createdAt",
    },
  },
});
