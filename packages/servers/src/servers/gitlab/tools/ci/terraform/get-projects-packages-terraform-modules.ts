import { defineTool } from "@usemcpkit/core";

export const ciTerraformGetProjectsPackagesTerraformModules = defineTool({
  name: "ci:terraform:get_projects_packages_terraform_modules",
  description:
    "Download the latest version of a module. Downloads the latest version of a specified module. This feature was introduced in GitLab 16.7.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      module_name: {
        type: "string",
        description: "Module name.",
      },
      module_system: {
        type: "string",
        description: "Name of the module system, or provider.",
      },
      terraform_get: {
        type: "string",
        enum: ["1"],
        description: "Terraform get redirection flag.",
      },
    },
    required: ["id", "module_name", "module_system"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages/terraform/modules/{module_name}/{module_system}",
    query: {
      "terraform-get": "terraform_get",
    },
  },
});
