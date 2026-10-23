import { defineTool, input, optional, string } from '@mcpkit/core';
import { PAGE, PER_PAGE, PROJECT_FIELDS } from '../const';

export const listProjects = defineTool({
  name: 'list_projects',
  description: 'List the projects the signed-in user is a member of, optionally filtered by a search term.',
  input: input({
    search: optional(string('Match against project name and path')),
    per_page: PER_PAGE,
    page: PAGE,
  }),
  request: {
    method: 'GET',
    path: '/projects',
    query: ['search', 'per_page', 'page'],
    fixedQuery: { membership: 'true', order_by: 'last_activity_at' },
  },
  response: { fields: PROJECT_FIELDS },
});
