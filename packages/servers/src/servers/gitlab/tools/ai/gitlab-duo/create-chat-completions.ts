import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoCreateChatCompletions = defineTool({
  name: 'ai:gitlab_duo:create_chat_completions',
  description: 'Generate a Chat response. Generates a response for a GitLab Duo Chat question.',
  input: {
    type: 'object',
    properties: {
      content: {
        type: 'string',
        description: 'Question sent to Chat.',
      },
      resource_type: {
        type: 'string',
        description: 'Type of resource sent with the chat question.',
        enum: ['issue', 'epic', 'group', 'project', 'merge_request', 'commit', 'build', 'work_item'],
      },
      resource_id: {
        type: 'string',
        description: 'ID of the resource. Can be a numeric ID or a commit SHA.',
      },
      referer_url: {
        type: 'string',
        description: 'Referer URL.',
      },
      client_subscription_id: {
        type: 'string',
        description: 'Client subscription ID.',
      },
      with_clean_history: {
        type: 'boolean',
        description: 'If `true`, resets history before and after the request.',
      },
      project_id: {
        type: 'integer',
        description: 'ID of the project. Required when `resource_type` is `commit`.',
      },
      current_file: {
        type: 'object',
        description: 'Object that contains information about the current file.',
        properties: {
          file_name: {
            type: 'string',
            description: 'Name of the current file.',
          },
          content_above_cursor: {
            type: 'string',
            description: 'Content above cursor.',
          },
          content_below_cursor: {
            type: 'string',
            description: 'Content below cursor.',
          },
          selected_text: {
            type: 'string',
            description: 'Content currently selected by the user.',
          },
        },
      },
      additional_context: {
        type: 'array',
        description:
          'Additional context to pass to the chat request. See Context attributes for the parameters this attribute accepts.',
        items: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Category of the additional context.',
              enum: [
                'file',
                'snippet',
                'merge_request',
                'issue',
                'dependency',
                'local_git',
                'terminal',
                'user_rule',
                'repository',
                'directory',
                'agent_user_environment',
                'attachments',
              ],
            },
            id: {
              type: 'string',
              description: 'ID of the additional context.',
            },
            content: {
              type: 'string',
              description: 'Content of the additional context.',
            },
            metadata: {
              type: 'object',
              description: 'Metadata of the additional context.',
            },
          },
          required: ['category', 'id', 'content'],
        },
      },
    },
    required: ['content'],
  },
  request: {
    method: 'POST',
    path: '/chat/completions',
    body: [
      'content',
      'resource_type',
      'resource_id',
      'referer_url',
      'client_subscription_id',
      'with_clean_history',
      'project_id',
      'current_file',
      'additional_context',
    ],
  },
});
