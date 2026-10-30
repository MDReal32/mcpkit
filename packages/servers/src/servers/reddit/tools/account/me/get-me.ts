import { defineTool } from "@usemcpkit/core";

export const accountMeGetMe = defineTool({
  name: "account:me:get_me",
  description: "Get the account the access token belongs to. Needs the `identity` scope.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/api/v1/me",
    fixedQuery: {
      raw_json: 1,
    },
  },
  response: {
    fields: ["name", "id", "created_utc", "link_karma", "comment_karma", "total_karma", "is_mod", "is_employee"],
  },
});
