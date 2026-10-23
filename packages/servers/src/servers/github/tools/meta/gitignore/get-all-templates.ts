import { defineTool } from '@usemcpkit/core';

export const metaGitignoreGetAllTemplates = defineTool({
  name: 'meta:gitignore:get_all_templates',
  description:
    'Get all gitignore templates. List all templates available to pass as an option when creating a repository.',
  input: {
    type: 'object',
    properties: {},
  },
  request: {
    method: 'GET',
    path: '/gitignore/templates',
  },
});
