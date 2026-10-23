import { defineTool } from '@usemcpkit/core';

export const orgsOrgsDisableSelectedRepositoryImmutableReleasesOrganization = defineTool({
  name: 'orgs:orgs:disable_selected_repository_immutable_releases_organization',
  description:
    'Disable a selected repository for immutable releases in an organization. Removes a repository from the list of selected repositories that are enforced for immutable releases in an organization. To use this endpoint, the organization immutable releases policy for `enforced_repositories` must be configured to `selected`.',
  input: {
    type: 'object',
    properties: {
      org: {
        type: 'string',
        description: 'The organization name. The name is not case sensitive.',
      },
      repository_id: {
        type: 'integer',
        description: 'The unique identifier of the repository.',
      },
    },
    required: ['org', 'repository_id'],
  },
  request: {
    method: 'DELETE',
    path: '/orgs/{org}/settings/immutable-releases/repositories/{repository_id}',
  },
});
