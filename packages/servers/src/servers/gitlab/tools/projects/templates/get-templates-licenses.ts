import { defineTool } from '@usemcpkit/core';

export const projectsTemplatesGetTemplatesLicenses = defineTool({
  name: 'projects:templates:get_templates_licenses',
  description:
    'Retrieve a license template. Retrieves a specified license template. You can pass parameters to replace the license placeholder.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Name of the license template.',
      },
      project: {
        type: 'string',
        description: 'Name of the copyrighted project.',
      },
      fullname: {
        type: 'string',
        description: 'Full name of the copyright holder.',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'GET',
    path: '/templates/licenses/{name}',
    query: ['project', 'fullname'],
  },
});
