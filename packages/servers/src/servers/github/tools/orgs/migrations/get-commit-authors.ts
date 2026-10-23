import { defineTool } from '@usemcpkit/core';

export const orgsMigrationsGetCommitAuthors = defineTool({
  name: 'orgs:migrations:get_commit_authors',
  description:
    '[Deprecated] Get commit authors. Each type of source control system represents authors in a different way. For example, a Git commit author has a display name and an email address, but a Subversion commit author just has a username. The GitHub Importer will make the author information valid, but the author might not be correct. For example, it will change the bare Subversion username `hubot` into something like `hubot <hubot@123…',
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
      since: {
        type: 'integer',
        description: 'A user ID. Only return users with an ID greater than this ID.',
      },
    },
    required: ['owner', 'repo'],
  },
  request: {
    method: 'GET',
    path: '/repos/{owner}/{repo}/import/authors',
    query: ['since'],
  },
});
