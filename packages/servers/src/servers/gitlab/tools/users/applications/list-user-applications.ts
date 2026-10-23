import { defineTool } from "@usemcpkit/core";

export const usersApplicationsListUserApplications = defineTool({
  name: "users:applications:list_user_applications",
  description: "List all applications. Lists all applications owned by the authenticated user.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/user/applications",
  },
});
