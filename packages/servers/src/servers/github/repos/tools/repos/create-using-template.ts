import { defineTool } from '@usemcpkit/core';

export const reposCreateUsingTemplate = defineTool({
  name: 'repos:create_using_template',
  description:
    "Create a repository using a template. Creates a new repository using a repository template. Use the `template_owner` and `template_repo` route parameters to specify the repository to use as the template. If the repository is not public, the authenticated user must own or be a member of an organization that owns the repository. To check if a repository is available to use as a template, get the repository's information using the Get a…",
  input: {
    type: 'object',
    properties: {
      template_owner: {
        type: 'string',
        description: 'The account owner of the template repository. The name is not case sensitive.',
      },
      template_repo: {
        type: 'string',
        description:
          'The name of the template repository without the `.git` extension. The name is not case sensitive.',
      },
      owner: {
        type: 'string',
        description:
          'The organization or person who will own the new repository. To create a new repository in an organization, the authenticated user must be a member of the specified organization.',
      },
      name: {
        type: 'string',
        description: 'The name of the new repository.',
      },
      description: {
        type: 'string',
        description: 'A short description of the new repository.',
      },
      include_all_branches: {
        type: 'boolean',
        description:
          'Set to `true` to include the directory structure and files from all branches in the template repository, and not just the default branch. Default: `false`.',
        default: false,
      },
      private: {
        type: 'boolean',
        description: 'Either `true` to create a new private repository or `false` to create a new public one.',
        default: false,
      },
    },
    required: ['template_owner', 'template_repo', 'name'],
  },
  request: {
    method: 'POST',
    path: '/repos/{template_owner}/{template_repo}/generate',
    body: ['owner', 'name', 'description', 'include_all_branches', 'private'],
  },
});
