import { defineTool } from '@usemcpkit/core';

export const reposChecksCreate = defineTool({
  name: 'repos:checks:create',
  description: 'Create a check run. Creates a new check run for a specific commit in a repository.',
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
        description: 'The name of the check. For example, "code-coverage".',
      },
      head_sha: {
        type: 'string',
        description: 'The SHA of the commit.',
      },
      details_url: {
        type: 'string',
        description:
          "The URL of the integrator's site that has the full details of the check. If the integrator does not provide this, then the homepage of the GitHub app is used.",
      },
      external_id: {
        type: 'string',
        description: "A reference for the run on the integrator's system.",
      },
      status: {
        enum: ['queued', 'in_progress'],
      },
      started_at: {
        type: 'string',
        description:
          'The time that the check run began. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      conclusion: {
        type: 'string',
        description:
          '**Required if you provide `completed_at` or a `status` of `completed`**. The final conclusion of the check. **Note:** Providing `conclusion` will automatically set the `status` parameter to `completed`. You cannot change a check run conclusion to `stale`, only GitHub can set this.',
        enum: ['action_required', 'cancelled', 'failure', 'neutral', 'success', 'skipped', 'stale', 'timed_out'],
      },
      completed_at: {
        type: 'string',
        description: 'The time the check completed. This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      output: {
        type: 'object',
        description:
          'Check runs can accept a variety of data in the `output` object, including a `title` and `summary` and can optionally provide descriptive details about the run.',
        properties: {
          title: {
            type: 'string',
            description: 'The title of the check run.',
          },
          summary: {
            type: 'string',
            description:
              'The summary of the check run. This parameter supports Markdown. **Maximum length**: 65535 characters.',
          },
          text: {
            type: 'string',
            description:
              'The details of the check run. This parameter supports Markdown. **Maximum length**: 65535 characters.',
          },
          annotations: {
            type: 'array',
            description:
              'Adds information from your analysis to specific lines of code. Annotations are visible on GitHub in the **Checks** and **Files changed** tab of the pull request. The Checks API limits the number of annotations to a maximum of 50 per API request. To create more than 50 annotations, you have to make multiple requests to the Update a check run endpoint. Each time you update the check run, annotation…',
            items: {
              type: 'object',
            },
          },
          images: {
            type: 'array',
            description: 'Adds images to the output displayed in the GitHub pull request UI.',
            items: {
              type: 'object',
            },
          },
        },
        required: ['title', 'summary'],
      },
      actions: {
        type: 'array',
        description:
          'Displays a button on GitHub that can be clicked to alert your app to do additional tasks. For example, a code linting app can display a button that automatically fixes detected errors. The button created in this object is displayed after the check run completes. When a user clicks the button, GitHub sends the `check_run.requested_action` webhook to your app. Each action includes a `label`, `ident…',
        items: {
          type: 'object',
          properties: {
            label: {
              type: 'string',
              description: 'The text to be displayed on a button in the web UI. The maximum size is 20 characters.',
            },
            description: {
              type: 'string',
              description: 'A short explanation of what this action would do. The maximum size is 40 characters.',
            },
            identifier: {
              type: 'string',
              description: "A reference for the action on the integrator's system. The maximum size is 20 characters.",
            },
          },
          required: ['label', 'description', 'identifier'],
        },
      },
    },
    required: ['owner', 'repo', 'name', 'head_sha'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/check-runs',
    body: [
      'name',
      'head_sha',
      'details_url',
      'external_id',
      'status',
      'started_at',
      'conclusion',
      'completed_at',
      'output',
      'actions',
    ],
  },
});
