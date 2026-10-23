import { defineTool } from "@usemcpkit/core";

export const securityLicensesUpdateProjectsManagedLicenses = defineTool({
  name: "security:licenses:update_projects_managed_licenses",
  description: "Update a software license policy. Updates a specified software license policy for a project.",
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
      name: {
        type: "string",
        description: "Name of the license.",
      },
      approval_status: {
        type: "string",
        description: "Approval status of the license.",
        enum: ["allowed", "denied"],
      },
    },
    required: ["id", "managed_license_id"],
  },
  request: {
    method: "PATCH",
    path: "/projects/{id}/managed_licenses/{managed_license_id}",
    body: ["name", "approval_status"],
  },
});
