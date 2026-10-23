import { defineTool } from '@usemcpkit/core';

export const aiOrbitGetOrbitSkillsGet = defineTool({
  name: 'ai:orbit:get_orbit_skills_get',
  description: 'Retrieve a deployed Orbit skill file. Retrieves a UTF-8 file from a deployed Orbit skill as raw text.',
  input: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Deployed skill name',
      },
      path: {
        type: 'string',
        description: 'File path relative to the skill root',
      },
    },
    required: ['name', 'path'],
  },
  request: {
    method: 'GET',
    path: '/orbit/skills/{name}/{path}',
  },
});
