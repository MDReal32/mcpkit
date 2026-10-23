import { defineTool } from '@usemcpkit/core';

export const ciTerraformGetPackagesTerraformModulesV1 = defineTool({
  name: 'ci:terraform:get_packages_terraform_modules_v1',
  description: 'Retrieve latest version for a module. Retrieves latest version for a specified module.',
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
    },
    required: ['module_namespace', 'module_name', 'module_system'],
  },
  request: {
    method: 'GET',
    path: '/packages/terraform/modules/v1/{module_namespace}/{module_name}/{module_system}',
  },
});
