import { defineTool } from "@usemcpkit/core";

export const groupsAccessRequestsCreateProjectsAccessRequests = defineTool({
  name: "groups:access_requests:create_projects_access_requests",
  description: "Request access to a project. Requests access to a specified project for the authenticated user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/access_requests",
  },
});
