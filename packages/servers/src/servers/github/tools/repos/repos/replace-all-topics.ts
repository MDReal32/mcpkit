import { defineTool } from '@usemcpkit/core';

export const reposReposReplaceAllTopics = defineTool({
  name: 'repos:repos:replace_all_topics',
  description: 'Replace all repository topics',
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
      names: {
        type: 'array',
        description:
          'An array of topics to add to the repository. Pass one or more topics to _replace_ the set of existing topics. Send an empty array (`[]`) to clear all topics from the repository. **Note:** Topic `names` will be saved as lowercase.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'names'],
  },
  request: {
    method: 'PUT',
    path: '/repos/{owner}/{repo}/topics',
    body: ['names'],
  },
});
