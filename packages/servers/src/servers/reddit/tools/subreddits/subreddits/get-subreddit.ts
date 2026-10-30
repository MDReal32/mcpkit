import { defineTool } from "@usemcpkit/core";

export const subredditsSubredditsGetSubreddit = defineTool({
  name: "subreddits:subreddits:get_subreddit",
  description: "Get a subreddit's description, subscriber count and type",
  input: {
    type: "object",
    properties: {
      subreddit: {
        type: "string",
        description: "Subreddit name without the r/ prefix; `all` and `popular` work for listings.",
      },
    },
    required: ["subreddit"],
  },
  request: {
    method: "GET",
    path: "/r/{subreddit}/about",
    fixedQuery: {
      raw_json: 1,
    },
  },
  response: {
    fields: {
      name: "data.name",
      display_name: "data.display_name",
      title: "data.title",
      public_description: "data.public_description",
      subscribers: "data.subscribers",
      active_user_count: "data.active_user_count",
      created_utc: "data.created_utc",
      over18: "data.over18",
      subreddit_type: "data.subreddit_type",
      url: "data.url",
    },
  },
});
