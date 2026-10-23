import { defineTool } from '@usemcpkit/core';

export const ciTerraformGetPackagesTerraformModulesV1File = defineTool({
  name: 'ci:terraform:get_packages_terraform_modules_v1_file',
  description: 'Download specific version of a module',
  input: {
    type: 'object',
    properties: {
      module_namespace: {
        type: 'string',
        description: "Group's ID or slug.",
      },
      module_name: {
        type: 'string',
        description: 'Name of the module.',
      },
      module_system: {
        type: 'string',
        description: 'Name of the module system, or provider.',
      },
      module_version: {
        type: 'string',
        description: 'Version of the module',
      },
    },
    required: ['module_namespace', 'module_name', 'module_system', 'module_version'],
  },
  request: {
    method: 'GET',
    path: '/packages/terraform/modules/v1/{module_namespace}/{module_name}/{module_system}/{module_version}/file',
  },
});
