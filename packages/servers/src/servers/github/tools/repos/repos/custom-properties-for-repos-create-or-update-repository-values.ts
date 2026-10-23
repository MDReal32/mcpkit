import { defineTool } from '@usemcpkit/core';

export const reposReposCustomPropertiesForReposCreateOrUpdateRepositoryValues = defineTool({
  name: 'repos:repos:custom_properties_for_repos_create_or_update_repository_values',
  description:
    "Create or update custom property values for a repository. Create new or update existing custom property values for a repository. Using a value of `null` for a custom property will remove or 'unset' the property value from the repository.",
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository without the `.git` extension. The name is not case sensitive.',
      },
      properties: {
        type: 'array',
        description: 'A list of custom property names and associated values to apply to the repositories.',
        items: {
          type: 'object',
          description: 'Custom property name and associated value',
          properties: {
            property_name: {
              type: 'string',
              description: 'The name of the property',
            },
            value: {
              description: 'The value assigned to the property',
            },
          },
          required: ['property_name', 'value'],
        },
      },
    },
    required: ['owner', 'repo', 'properties'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/properties/values',
    body: ['properties'],
  },
});
