import { defineTool } from '@usemcpkit/core';

export const issuesIssuesUpdateLabel = defineTool({
  name: 'issues:issues:update_label',
  description: 'Update a label. Updates a label using the given label name.',
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
      },
      new_name: {
        type: 'string',
        description:
          'The new name of the label. Emoji can be added to label names, using either native emoji or colon-style markup. For example, typing `:strawberry:` will render the emoji !:strawberry:. For a full list of available emoji and codes, see "Emoji cheat sheet."',
      },
      color: {
        type: 'string',
        description: 'The hexadecimal color code for the label, without the leading `#`.',
      },
      description: {
        type: 'string',
        description: 'A short description of the label. Must be 100 characters or fewer.',
      },
      archived: {
        type: 'boolean',
        description:
          'Whether to archive or unarchive the label. Archived labels cannot be added to issues or pull requests. For more information, see "Archiving labels."',
      },
    },
    required: ['owner', 'repo', 'name'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/labels/{name}',
    body: ['new_name', 'color', 'description', 'archived'],
  },
});
