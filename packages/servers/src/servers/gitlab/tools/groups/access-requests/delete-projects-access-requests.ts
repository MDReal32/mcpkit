import { defineTool } from "@usemcpkit/core";

export const groupsAccessRequestsDeleteProjectsAccessRequests = defineTool({
  name: "groups:access_requests:delete_projects_access_requests",
  description: "Deny an access request. Denies an access request for a specified user in a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      user_id: {
        type: "integer",
        description: "ID of the user requesting access.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/access_requests/{user_id}",
  },
});
