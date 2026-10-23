import { defineTool } from "@usemcpkit/core";

export const cloudBlogpostsCreateBlogPost = defineTool({
  name: "cloud:blogposts:create_blog_post",
  description: "[Cloud] Create blog post. Creates a new blog post in the space specified by the spaceId.",
  input: {
    type: "object",
    properties: {
      private: {
        type: "boolean",
        description:
          "The blog post will be private. Only the user who creates this blog post will have permission to view and edit one.",
      },
      spaceId: {
        type: "string",
        description: "ID of the space",
      },
      status: {
        type: "string",
        description:
          "The status of the blog post, specifies if the blog post will be created as a new blog post or a draft",
        enum: ["current", "draft"],
      },
      title: {
        type: "string",
        description: "Title of the blog post, required if creating non-draft.",
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
      createdAt: {
        type: "string",
        description: 'Created date of the blog post in the format of "yyyy-MM-ddTHH:mm:ss.SSSZ".',
      },
    },
    required: ["spaceId"],
  },
  request: {
    method: "POST",
    path: "/wiki/api/v2/blogposts",
    query: ["private"],
    body: ["spaceId", "status", "title", "body", "createdAt"],
  },
});
