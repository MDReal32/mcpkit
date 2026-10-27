import { defineTool } from "@usemcpkit/core";

export const usersAuthorizationGetAuthorizedUser = defineTool({
  name: "users:authorization:get_authorized_user",
  description: "Get Authorized User. View the details of the authenticated user's ClickUp account.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/v2/user",
  },
});
