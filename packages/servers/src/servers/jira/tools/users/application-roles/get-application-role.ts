import { defineTool } from "@usemcpkit/core";

export const usersApplicationRolesGetApplicationRole = defineTool({
  name: "users:application_roles:get_application_role",
  description: "Get application role. Returns an application role.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description:
          "The key of the application role. Use the Get all application roles operation to get the key for each application role.",
      },
    },
    required: ["key"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/applicationrole/{key}",
  },
});
