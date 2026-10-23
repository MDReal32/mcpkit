import { defineTool } from "@usemcpkit/core";

export const groupsMembersGetProjectsMembers = defineTool({
  name: "groups:members:get_projects_members",
  description:
    "Retrieve a direct project member. Retrieves a specified member of a project. Returns only direct members and not inherited members through ancestor groups.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      user_id: {
        type: "integer",
        description: "User ID of the member.",
      },
    },
    required: ["id", "user_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/members/{user_id}",
  },
});
