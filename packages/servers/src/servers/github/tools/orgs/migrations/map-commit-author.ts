import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsMapCommitAuthor = defineTool({
  name: 'orgs:migrations:map_commit_author',
  description:
    "[Deprecated] Map a commit author. Update an author's identity for the import. Your application can continue updating authors any time before you push new commits to the repository.",
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
      author_id: {
        type: 'integer',
      },
      email: {
        type: 'string',
        description: 'The new Git author email.',
      },
      name: {
        type: 'string',
        description: 'The new Git author name.',
      },
    },
    required: ['owner', 'repo', 'author_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/import/authors/{author_id}',
    body: ['email', 'name'],
  },
});
