import { defineTool } from '@usemcpkit/core';

export const issuesCreateLabel = defineTool({
  name: 'issues:create_label',
  description:
    'Create a label. Creates a label for the specified repository with the given name and color. The name and color parameters are required. The color must be a valid hexadecimal color code.',
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
      name: {
        type: 'string',
        description:
          'The name of the label. Emoji can be added to label names, using either native emoji or colon-style markup. For example, typing `:strawberry:` will render the emoji !:strawberry:. For a full list of available emoji and codes, see "Emoji cheat sheet."',
      },
      color: {
        type: 'string',
        description: 'The hexadecimal color code for the label, without the leading `#`.',
      },
      description: {
        type: 'string',
        description: 'A short description of the label. Must be 100 characters or fewer.',
      },
    },
    required: ['owner', 'repo', 'name'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/labels',
    body: ['name', 'color', 'description'],
  },
});
