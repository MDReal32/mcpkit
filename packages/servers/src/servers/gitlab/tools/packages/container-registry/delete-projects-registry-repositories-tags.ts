import { defineTool } from '@usemcpkit/core';

export const packagesContainerRegistryDeleteProjectsRegistryRepositoriesTags = defineTool({
  name: 'packages:container_registry:delete_projects_registry_repositories_tags',
  description:
    'Delete multiple registry repository tags. Deletes multiple registry repository tags based on the specified criteria.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      repository_id: {
        type: 'integer',
        description: 'ID of the container registry repository.',
      },
      name_regex_delete: {
        type: 'string',
        description:
          'RE2 regular expression of the tag names to delete. Specify `.*` to delete all tags. At least one of `name_regex`, `name_regex_delete` must be provided.',
      },
      name_regex: {
        type: 'string',
        description:
          'RE2 regular expression of the tag names to delete. Specify `.*` to delete all tags. Deprecated. Use `name_regex_delete` instead. At least one of `name_regex`, `name_regex_delete` must be provided.',
      },
      name_regex_keep: {
        type: 'string',
        description:
          'RE2 regular expression of the tag names to keep. Overrides any matches from `name_regex_delete`. Setting to `.*` results in a no-op.',
      },
      keep_n: {
        type: 'integer',
        description: 'Number of most recent tags with a matching name to keep.',
      },
      older_than: {
        type: 'string',
        description: 'Delete tags older than this age, such as `1h`, `1d`, or `1month`.',
      },
    },
    required: ['id', 'repository_id'],
  },
  request: {
    method: 'DELETE',
    path: '/projects/{id}/registry/repositories/{repository_id}/tags',
    query: ['name_regex_delete', 'name_regex', 'name_regex_keep', 'keep_n', 'older_than'],
  },
});
