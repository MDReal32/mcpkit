import { defineTool } from "@usemcpkit/core";

export const subredditsRulesGetSubredditRules = defineTool({
  name: "subreddits:rules:get_subreddit_rules",
  description: "Get a subreddit's posting rules",
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
    path: "/r/{subreddit}/about/rules",
    fixedQuery: {
      raw_json: 1,
    },
  },
  response: {
    fields: ["rules"],
  },
});
