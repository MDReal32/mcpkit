import { defineTool } from '@usemcpkit/core';

export const issuesAwardEmojiCreateProjectsSnippetsAwardEmoji = defineTool({
  name: 'issues:award_emoji:create_projects_snippets_award_emoji',
  description: 'Add an emoji reaction to a snippet. Adds an emoji reaction to a snippet.',
  input: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'ID or URL-encoded path of the project.',
      },
      snippet_id: {
        type: 'integer',
        description: 'ID of the snippet.',
      },
      name: {
        type: 'string',
        description: 'Name of the emoji without colons.',
      },
    },
    required: ['id', 'snippet_id', 'name'],
  },
  request: {
    method: 'POST',
    path: '/projects/{id}/snippets/{snippet_id}/award_emoji',
    body: ['name'],
  },
});
