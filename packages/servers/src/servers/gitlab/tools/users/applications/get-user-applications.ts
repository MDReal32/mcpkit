import { defineTool } from "@usemcpkit/core";

export const usersApplicationsGetUserApplications = defineTool({
  name: "users:applications:get_user_applications",
  description: "Retrieve an application. Retrieves details of a specific application owned by the authenticated user.",
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
    method: "GET",
    path: "/user/applications/{id}",
  },
});
