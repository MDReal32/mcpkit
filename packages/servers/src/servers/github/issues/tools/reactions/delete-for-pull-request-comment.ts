import { defineTool } from '@usemcpkit/core';

export const reactionsDeleteForPullRequestComment = defineTool({
  name: 'reactions:delete_for_pull_request_comment',
  description:
    'Delete a pull request comment reaction. > [!NOTE] > You can also specify a repository by `repository_id` using the route `DELETE /repositories/:repository_id/pulls/comments/:comment_id/reactions/:reaction_id.`',
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
      comment_id: {
        type: 'integer',
        description: 'The unique identifier of the comment.',
      },
      reaction_id: {
        type: 'integer',
        description: 'The unique identifier of the reaction.',
      },
    },
    required: ['owner', 'repo', 'comment_id', 'reaction_id'],
  },
  request: {
    method: 'DELETE',
    path: '/repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}',
  },
});
