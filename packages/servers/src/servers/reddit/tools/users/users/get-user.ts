import { defineTool } from "@usemcpkit/core";

export const usersUsersGetUser = defineTool({
  name: "users:users:get_user",
  description: "Get a user's public profile and karma",
  input: {
    type: "object",
    properties: {
      username: {
        type: "string",
        description: "Username without the u/ prefix.",
      },
    },
    required: ["username"],
  },
  request: {
    method: "GET",
    path: "/user/{username}/about",
    fixedQuery: {
      raw_json: 1,
    },
  },
  response: {
    fields: {
      name: "data.name",
      id: "data.id",
      created_utc: "data.created_utc",
      link_karma: "data.link_karma",
      comment_karma: "data.comment_karma",
      total_karma: "data.total_karma",
      is_mod: "data.is_mod",
      is_employee: "data.is_employee",
    },
  },
});
