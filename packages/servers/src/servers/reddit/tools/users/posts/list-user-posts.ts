import { defineTool } from "@usemcpkit/core";

export const usersPostsListUserPosts = defineTool({
  name: "users:posts:list_user_posts",
  description: "List the posts a user submitted",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "Username without the u/ prefix.",
      },
      sort: {
        type: "string",
        enum: ["hot", "new", "top", "controversial"],
      },
      t: {
        type: "string",
        enum: ["hour", "day", "week", "month", "year", "all"],
        description: "Time window for `top`, `controversial` and search.",
      },
      limit: {
        type: "integer",
        description: "Items to return, 1-100 (Reddit's default is 25).",
      },
      after: {
        type: "string",
        description: "Fullname of the last item seen (its `name`, e.g. t3_abc) to get the next page.",
      },
      before: {
        type: "string",
        description: "Fullname of the first item seen to get the previous page.",
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/user/{username}/submitted",
    query: ["sort", "t", "limit", "after", "before"],
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
