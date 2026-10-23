import { defineTool } from "@usemcpkit/core";

export const usersApplicationsListApplications = defineTool({
  name: "users:applications:list_applications",
  description: "Get applications. List all registered applications",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/applications",
  },
});
