import { defineTool } from "@usemcpkit/core";

export const ciTerraformListPackagesTerraformModulesV1Versions = defineTool({
  name: "ci:terraform:list_packages_terraform_modules_v1_versions",
  description: "List all available versions for a module. Lists all available versions for a specified module.",
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
    path: "/packages/terraform/modules/v1/{module_namespace}/{module_name}/{module_system}/versions",
  },
});
