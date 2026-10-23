import { defineTool } from '@usemcpkit/core';

export const pullsCreate = defineTool({
  name: 'pulls:create',
  description:
    "Create a pull request. Draft pull requests are available in public repositories with GitHub Free and GitHub Free for organizations, GitHub Pro, and legacy per-repository billing plans, and in public and private repositories with GitHub Team and GitHub Enterprise Cloud. For more information, see GitHub's products in the GitHub Help documentation.",
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
      title: {
        type: 'string',
        description: 'The title of the new pull request. Required unless `issue` is specified.',
      },
      head: {
        type: 'string',
        description:
          'The name of the branch where your changes are implemented. For cross-repository pull requests in the same network, namespace `head` with a user like this: `username:branch`.',
      },
      head_repo: {
        type: 'string',
        description:
          'The name of the repository where the changes in the pull request were made. This field is required for cross-repository pull requests if both repositories are owned by the same organization.',
      },
      base: {
        type: 'string',
        description:
          'The name of the branch you want the changes pulled into. This should be an existing branch on the current repository. You cannot submit a pull request to one repository that requests a merge to a base of another repository.',
      },
      body: {
        type: 'string',
        description: 'The contents of the pull request.',
      },
      maintainer_can_modify: {
        type: 'boolean',
        description: 'Indicates whether maintainers can modify the pull request.',
      },
      draft: {
        type: 'boolean',
        description:
          'Indicates whether the pull request is a draft. See "Draft Pull Requests" in the GitHub Help documentation to learn more.',
      },
      issue: {
        type: 'integer',
        description:
          'An issue in the repository to convert to a pull request. The issue title, body, and comments will become the title, body, and comments on the new pull request. Required unless `title` is specified.',
      },
    },
    required: ['owner', 'repo', 'head', 'base'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pulls',
    body: ['title', 'head', 'head_repo', 'base', 'body', 'maintainer_can_modify', 'draft', 'issue'],
  },
});
