import { defineTool } from "@usemcpkit/core";

export const usersApplicationsUpdateUserApplications = defineTool({
  name: "users:applications:update_user_applications",
  description: "Update an application. Updates an existing application owned by the authenticated user.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the application. Differs from `application_id`.",
      },
      name: {
        type: "string",
        description: "Name of the application.",
      },
      scopes: {
        type: "string",
        description: "Scopes available to the application. Separate multiple scopes with a space.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/user/applications/{id}",
    body: ["name", "scopes"],
  },
});
