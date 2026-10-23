import { defineTool } from '@usemcpkit/core';

export const copilotSpacesListForUser = defineTool({
  name: 'copilot_spaces:list_for_user',
  description:
    "List Copilot Spaces for a user. Lists Copilot Spaces owned by a user. The authenticated user must have read access to the user's Copilot Spaces.",
  input: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
        description: 'The handle for the GitHub user account.',
      },
      per_page: {
        type: 'integer',
        default: 30,
        description: 'The number of results per page (max 100).',
      },
      before: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results before this cursor.',
      },
      after: {
        type: 'string',
        description:
          'A cursor, as given in the Link header. If specified, the query only searches for results after this cursor.',
      },
    },
    required: ['username'],
  },
  request: {
    method: 'GET',
    path: '/users/{username}/copilot-spaces',
    query: ['per_page', 'before', 'after'],
  },
});
