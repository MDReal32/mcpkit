import { defineTool } from "@usemcpkit/core";

export const usersApplicationRolesGetAllApplicationRoles = defineTool({
  name: "users:application_roles:get_all_application_roles",
  description:
    "Get all application roles. Returns all application roles. In Jira, application roles are managed using the Application access configuration page.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/applicationrole",
  },
});
