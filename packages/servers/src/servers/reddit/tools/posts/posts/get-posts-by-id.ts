import { defineTool } from "@usemcpkit/core";

export const postsPostsGetPostsById = defineTool({
  name: "posts:posts:get_posts_by_id",
  description: "Get posts by fullname. Up to 100 posts at once.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "Post fullnames (t3_ followed by the post id), e.g. t3_1abcde,t3_1fghij. (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/api/info",
    query: ["id"],
    commaQuery: ["id"],
    fixedQuery: {
      raw_json: 1,
    },
  },
  response: {
    root: "data.children",
    fields: {
      name: "data.name",
      id: "data.id",
      subreddit: "data.subreddit",
      title: "data.title",
      author: "data.author",
      score: "data.score",
      upvote_ratio: "data.upvote_ratio",
      num_comments: "data.num_comments",
      created_utc: "data.created_utc",
      link_flair_text: "data.link_flair_text",
      over_18: "data.over_18",
      stickied: "data.stickied",
      is_self: "data.is_self",
      selftext: "data.selftext",
      url: "data.url",
      permalink: "data.permalink",
    },
  },
});
