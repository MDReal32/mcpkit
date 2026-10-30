import { defineTool } from "@usemcpkit/core";

export const subredditsSubredditsSearchSubreddits = defineTool({
  name: "subreddits:subreddits:search_subreddits",
  description: "Find subreddits by name and description",
  input: {
    type: "object",
    properties: {
      q: {
        type: "string",
        description: "Search query.",
      },
      sort: {
        type: "string",
        enum: ["relevance", "activity"],
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
    required: ["q"],
  },
  request: {
    method: "GET",
    path: "/subreddits/search",
    query: ["q", "sort", "limit", "after", "before"],
    fixedQuery: {
      raw_json: 1,
    },
  },
  response: {
    root: "data.children",
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
