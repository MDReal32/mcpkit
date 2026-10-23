import { defineTool } from "@usemcpkit/core";

export const ciTerraformGetPackagesTerraformModulesV1Download = defineTool({
  name: "ci:terraform:get_packages_terraform_modules_v1_download",
  description: "Retrieve download URL for latest module version. Retrieves download URL for latest module version.",
  input: {
    type: "object",
    properties: {
      module_namespace: {
        type: "string",
        description: "Group's ID or slug.",
      },
      module_name: {
        type: "string",
        description: "Name of the module.",
      },
      module_system: {
        type: "string",
        description: "Name of the module system, or provider.",
      },
    },
    required: ["module_namespace", "module_name", "module_system"],
  },
  request: {
    method: "GET",
    path: "/packages/terraform/modules/v1/{module_namespace}/{module_name}/{module_system}/download",
  },
});
