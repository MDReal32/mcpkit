import { defineTool } from "@usemcpkit/core";

export const postsCommentsGetPostComments = defineTool({
  name: "posts:comments:get_post_comments",
  description:
    "Get a post and its comment tree. Returns Reddit's two listings: [0] holds the post, [1] the top-level comments, each with nested `replies`; `more` entries mark comments left out by `limit` or `depth`.",
  input: {
    type: "object",
    properties: {
      article: {
        type: "string",
        description: "Post id without the t3_ prefix, e.g. 1abcde.",
      },
      sort: {
        type: "string",
        enum: ["confidence", "top", "new", "controversial", "old", "qa"],
      },
      limit: {
        type: "integer",
        description: "Most comments to return.",
      },
      depth: {
        type: "integer",
        description: "Deepest reply level to include.",
      },
      comment: {
        type: "string",
        description: "Id of a comment to focus the tree on.",
      },
      context: {
        type: "integer",
        description: "Parent comments to include above `comment`, 0-8.",
      },
    },
    required: ["article"],
  },
  request: {
    method: "GET",
    path: "/comments/{article}",
    query: ["sort", "limit", "depth", "comment", "context"],
    fixedQuery: {
      raw_json: 1,
    },
  },
});
