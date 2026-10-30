import { defineTool } from "@usemcpkit/core";

export const usersCommentsListUserComments = defineTool({
  name: "users:comments:list_user_comments",
  description: "List the comments a user wrote",
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
    path: "/user/{username}/comments",
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
      author: "data.author",
      body: "data.body",
      score: "data.score",
      created_utc: "data.created_utc",
      parent_id: "data.parent_id",
      link_id: "data.link_id",
      link_title: "data.link_title",
      permalink: "data.permalink",
    },
  },
});
