import { defineTool } from "@usemcpkit/core";

export const ciTerraformUpdateProjectsPackagesTerraformModulesFile = defineTool({
  name: "ci:terraform:update_projects_packages_terraform_modules_file",
  description: "Upload Terraform Module package file. This feature was introduced in GitLab 13.11",
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
      module_version: {
        type: "string",
        description: "Module version",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "module_name", "module_system", "module_version", "file"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/packages/terraform/modules/{module_name}/{module_system}/{module_version}/file",
    body: ["file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
