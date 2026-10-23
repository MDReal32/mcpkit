import { defineTool } from "@usemcpkit/core";

export const usersApplicationsDeleteUserApplications = defineTool({
  name: "users:applications:delete_user_applications",
  description: "Delete an application. Deletes a specified application owned by the authenticated user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the application. Differs from `application_id`.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/user/applications/{id}",
  },
});
