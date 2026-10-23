import { defineTool } from '@usemcpkit/core';

export const projectsProjectKeyAndNameValidationValidateProjectKey = defineTool({
  name: 'projects:project_key_and_name_validation:validate_project_key',
  description: 'Validate project key. Validates a project key by confirming the key is a valid string and not in use.',
  input: {
    type: 'object',
    properties: {
      key: {
        type: 'string',
        description: 'The project key.',
      },
    },
  },
  request: {
    method: 'GET',
    path: '/rest/api/2/projectvalidate/key',
    query: ['key'],
  },
});
