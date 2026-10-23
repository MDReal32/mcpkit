import { defineTool } from '@usemcpkit/core';

export const projectsTemplatesGetTemplatesDockerfiles = defineTool({
  name: 'projects:templates:get_templates_dockerfiles',
  description: 'Retrieve a Dockerfile template. Retrieves a specified Dockerfile template.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the Dockerfile template',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'GET',
    path: '/templates/dockerfiles/{name}',
  },
});
