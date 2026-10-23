import { defineTool } from "@usemcpkit/core";

export const ciTerraformCreateProjectsTerraformState = defineTool({
  name: "ci:terraform:create_projects_terraform_state",
  description: "Create or update a Terraform state. Creates or updates a Terraform state for a specified project.",
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
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "name", "file"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/terraform/state/{name}",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
