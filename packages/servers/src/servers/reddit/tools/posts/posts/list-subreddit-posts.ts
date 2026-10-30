import { defineTool } from "@usemcpkit/core";

export const postsPostsListSubredditPosts = defineTool({
  name: "posts:posts:list_subreddit_posts",
  description:
    "List a subreddit's posts by sort order. Read a post's comments with posts:comments:get_post_comments using its `id`.",
  input: {
    type: "object",
    properties: {
      subreddit: {
        type: "string",
        description: "Subreddit name without the r/ prefix; `all` and `popular` work for listings.",
      },
      sort: {
        type: "string",
        default: "hot",
        enum: ["hot", "new", "top", "rising", "controversial"],
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
    required: ["subreddit", "sort"],
  },
  request: {
    method: "GET",
    path: "/r/{subreddit}/{sort}",
    query: ["t", "limit", "after", "before"],
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
