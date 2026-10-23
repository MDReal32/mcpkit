import { defineTool } from "@usemcpkit/core";

export const ciTerraformDeleteProjectsTerraformStateVersions = defineTool({
  name: "ci:terraform:delete_projects_terraform_state_versions",
  description: "Delete a Terraform state version. Deletes a specified Terraform state version.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Name of the Terraform state.",
      },
      serial: {
        type: "integer",
        description: "Version number of the Terraform state.",
      },
    },
    required: ["id", "name", "serial"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/terraform/state/{name}/versions/{serial}",
  },
});
