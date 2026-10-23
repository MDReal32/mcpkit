import { defineTool } from '@usemcpkit/core';

export const orgsGetImmutableReleasesSettings = defineTool({
  name: 'orgs:get_immutable_releases_settings',
  description:
    'Get immutable releases settings for an organization. Gets the immutable releases policy for repositories in an organization.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
    },
    required: ['org'],
  },
  request: {
    method: 'GET',
    path: '/orgs/{org}/settings/immutable-releases',
  },
});
