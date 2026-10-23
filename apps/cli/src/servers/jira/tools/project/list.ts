import { defineTool, input } from '@usemcpkit/core';
import { PROJECT_FIELDS } from '../../const';

export const listProjects = defineTool({
  name: 'project:list',
  description: 'List the projects visible to the signed-in user.',
  input: input(),
  request: { method: 'GET', path: '/rest/api/2/project' },
  response: { fields: PROJECT_FIELDS },
  editions: {
    cloud: {
      request: { method: 'GET', path: '/rest/api/2/project/search' },
      response: { root: 'values', fields: PROJECT_FIELDS },
    },
  },
});
