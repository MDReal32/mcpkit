import { defineTool } from '@usemcpkit/core';

export const projectsSnippetsGetSnippetsUserAgentDetail = defineTool({
  name: 'projects:snippets:get_snippets_user_agent_detail',
  description: 'Retrieve user agent details for a snippet. Retrieves user agent details for a specified snippet.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID of the snippet.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/snippets/{id}/user_agent_detail',
  },
});
