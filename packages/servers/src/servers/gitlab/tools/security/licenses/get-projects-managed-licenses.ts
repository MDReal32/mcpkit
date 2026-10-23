import { defineTool } from "@usemcpkit/core";

export const securityLicensesGetProjectsManagedLicenses = defineTool({
  name: "security:licenses:get_projects_managed_licenses",
  description: "Retrieve a software license policy. Retrieves a specified software license policy from a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      managed_license_id: {
        type: "string",
        description: "ID of the managed license.",
      },
    },
    required: ["id", "managed_license_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/managed_licenses/{managed_license_id}",
  },
});
