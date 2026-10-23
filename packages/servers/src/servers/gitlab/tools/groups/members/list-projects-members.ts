import { defineTool } from '@usemcpkit/core';

export const groupsMembersListProjectsMembers = defineTool({
  name: 'groups:members:list_projects_members',
  description:
    'List all direct members of a project. Lists all direct members of a specified project viewable by the authenticated user. Does not return inherited members from ancestor groups or invited groups.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      query: {
        type: 'string',
        description: 'Filter results by name, email, or username. Use partial values to widen the scope of the query.',
      },
      user_ids: {
        type: 'string',
        description: 'Filter results by the given user IDs. (comma-separated)',
      },
      skip_users: {
        type: 'string',
        description: 'Filter skipped users out of the results. (comma-separated)',
      },
      show_seat_info: {
        type: 'boolean',
        description: 'If `true`, shows seat information for members.',
      },
      with_saml_identity: {
        type: 'boolean',
        description: 'If `true`, returns only members with a linked SAML identity.',
      },
      page: {
        type: 'integer',
        default: 1,
        description: 'Page number of results to retrieve.',
      },
      per_page: {
        type: 'integer',
        default: 20,
        description: 'Number of items to list per page.',
      },
    },
    required: ['id'],
  },
  request: {
    method: 'GET',
    path: '/projects/{id}/members',
    query: ['query', 'user_ids', 'skip_users', 'show_seat_info', 'with_saml_identity', 'page', 'per_page'],
  },
});
