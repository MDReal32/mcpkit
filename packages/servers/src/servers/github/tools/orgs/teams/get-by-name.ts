import { defineTool } from '@usemcpkit/core';

export const orgsTeamsGetByName = defineTool({
  name: 'orgs:teams:get_by_name',
  description:
    'Get a team by name. Gets a team using the team\'s `slug`. To create the `slug`, GitHub replaces special characters in the `name` string, changes all words to lowercase, and replaces spaces with a `-` separator. For example, `"My TEam Näme"` would become `my-team-name`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      team_slug: {
        type: 'string',
        description: 'The slug of the team name.',
      },
    },
    required: ['org', 'team_slug'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/teams/{team_slug}',
  },
});
