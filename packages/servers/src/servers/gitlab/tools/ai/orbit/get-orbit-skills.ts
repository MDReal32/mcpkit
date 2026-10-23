import { defineTool } from '@usemcpkit/core';

export const aiOrbitGetOrbitSkills = defineTool({
  name: 'ai:orbit:get_orbit_skills',
  description:
    'Retrieve a deployed Orbit skill. Retrieves a complete deployed Orbit skill tree. HEAD requests retrieve only skill metadata.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Deployed skill name',
      },
    },
    required: ['name'],
  },
  request: {
    method: 'GET',
    path: '/orbit/skills/{name}',
  },
});
