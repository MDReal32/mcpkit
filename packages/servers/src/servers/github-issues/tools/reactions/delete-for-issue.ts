import { defineTool } from '@usemcpkit/core';

export const reactionsDeleteForIssue = defineTool({
  name: 'reactions:delete_for_issue',
  description:
    'Delete an issue reaction. > [!NOTE] > You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/issues/:issue_number/reactions/:reaction_id`.',
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
      issue_number: {
        type: 'integer',
        description: 'The number that identifies the issue.',
      },
      reaction_id: {
        type: 'integer',
        description: 'The unique identifier of the reaction.',
      },
    },
    required: ['owner', 'repo', 'issue_number', 'reaction_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}',
  },
});
