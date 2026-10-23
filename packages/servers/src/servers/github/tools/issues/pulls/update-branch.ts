import { defineTool } from '@usemcpkit/core';

export const issuesPullsUpdateBranch = defineTool({
  name: 'issues:pulls:update_branch',
  description:
    'Update a pull request branch. Updates the pull request branch with the latest upstream changes by merging HEAD from the base branch into the pull request branch. Note: If making a request on behalf of a GitHub App you must also have permissions to write the contents of the head repository.',
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
      pull_number: {
        type: 'integer',
        description: 'The number that identifies the pull request.',
      },
      expected_head_sha: {
        type: 'string',
        description:
          "The expected SHA of the pull request's HEAD ref. This is the most recent commit on the pull request's branch. If the expected SHA does not match the pull request's HEAD, you will receive a `422 Unprocessable Entity` status. You can use the \"List commits\" endpoint to find the most recent commit SHA. Default: SHA of the pull request's current HEAD ref.",
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/update-branch',
    body: ['expected_head_sha'],
  },
});
