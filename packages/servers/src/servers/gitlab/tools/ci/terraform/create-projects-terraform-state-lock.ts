import { defineTool } from "@usemcpkit/core";

export const ciTerraformCreateProjectsTerraformStateLock = defineTool({
  name: "ci:terraform:create_projects_terraform_state_lock",
  description: "Lock a Terraform state. Locks a Terraform state for a specified project.",
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
      ID: {
        type: "string",
        description: "Terraform state lock ID.",
      },
      Operation: {
        type: "string",
        description: "Terraform operation.",
      },
      Info: {
        type: "string",
        description: "Terraform info",
      },
      Who: {
        type: "string",
        description: "Terraform state lock owner",
      },
      Version: {
        type: "string",
        description: "Terraform version",
      },
      Created: {
        type: "string",
        description: "Terraform state lock timestamp",
      },
      Path: {
        type: "string",
        description: "Terraform path",
      },
    },
    required: ["id", "name", "ID", "Operation", "Info", "Who", "Version", "Created", "Path"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/terraform/state/{name}/lock",
    body: ["ID", "Operation", "Info", "Who", "Version", "Created", "Path"],
  },
});
