import { defineTool } from "@usemcpkit/core";

export const postsPostsCreatePublicationPost = defineTool({
  name: "posts:posts:create_publication_post",
  description:
    "Publish a post under a publication. The user must be an editor or writer of the publication; a writer's post may wait for an editor. Use publishStatus draft to keep it private.",
  input: {
    type: "object",
    properties: {
      publicationId: {
        type: "string",
        description: "Publication id (from publications:publications:list_user_publications).",
      },
      title: {
        type: "string",
        description:
          "Post title for SEO and listings; titles over 100 characters are ignored and made from the content.",
      },
      contentFormat: {
        type: "string",
        description: "Format of `content`.",
        enum: ["html", "markdown"],
      },
      content: {
        type: "string",
        description: "The post body as an HTML fragment or Markdown. Medium side-loads images given by <img src>.",
      },
      tags: {
        type: "array",
        description: "Tags for the post; only the first three are used and tags over 25 characters are ignored.",
        items: {
          type: "string",
        },
      },
      canonicalUrl: {
        type: "string",
        description: "The original URL of the content, if it was published elsewhere first.",
      },
      publishStatus: {
        type: "string",
        description: "Defaults to public, which publishes at once.",
        enum: ["public", "draft", "unlisted"],
      },
      license: {
        type: "string",
        description: "Defaults to all-rights-reserved.",
        enum: [
          "all-rights-reserved",
          "cc-40-by",
          "cc-40-by-sa",
          "cc-40-by-nd",
          "cc-40-by-nc",
          "cc-40-by-nc-nd",
          "cc-40-by-nc-sa",
          "cc-40-zero",
          "public-domain",
        ],
      },
      notifyFollowers: {
        type: "boolean",
        description: "Whether to notify the user's followers that the post was published.",
      },
    },
    required: ["publicationId", "title", "contentFormat", "content"],
  },
  request: {
    method: "POST",
    path: "/publications/{publicationId}/posts",
    body: ["title", "contentFormat", "content", "tags", "canonicalUrl", "publishStatus", "license", "notifyFollowers"],
  },
  response: {
    root: "data",
    fields: ["id", "title", "authorId", "tags", "url", "canonicalUrl", "publishStatus", "publishedAt", "license"],
  },
});
