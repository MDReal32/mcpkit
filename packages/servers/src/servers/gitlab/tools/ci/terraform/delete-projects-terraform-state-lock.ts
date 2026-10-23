import { defineTool } from "@usemcpkit/core";

export const ciTerraformDeleteProjectsTerraformStateLock = defineTool({
  name: "ci:terraform:delete_projects_terraform_state_lock",
  description: "Unlock a Terraform state. Unlocks a Terraform state for a specified project.",
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
    },
    required: ["id", "name"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/terraform/state/{name}/lock",
    query: ["ID"],
  },
});
