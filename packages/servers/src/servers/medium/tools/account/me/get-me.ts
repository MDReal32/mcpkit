import { defineTool } from "@usemcpkit/core";

export const accountMeGetMe = defineTool({
  name: "account:me:get_me",
  description: "Get the Medium user the integration token belongs to; its `id` is the user id other tools take.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/me",
  },
  response: {
    root: "data",
    fields: ["id", "username", "name", "url", "imageUrl"],
  },
});
