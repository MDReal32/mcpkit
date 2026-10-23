import { defineTool } from "@usemcpkit/core";

export const securityLicensesGetLicenseGet = defineTool({
  name: "security:licenses:get_license_get",
  description: "Retrieve a license. Retrieves information about a specified license.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the GitLab license.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/license/{id}",
  },
});
