import { defineTool } from '@usemcpkit/core';

export const checksUpdate = defineTool({
  name: 'checks:update',
  description: 'Update a check run. Updates a check run for a specific commit in a repository.',
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
      check_run_id: {
        type: 'integer',
        description: 'The unique identifier of the check run.',
      },
      name: {
        type: 'string',
        description: 'The name of the check. For example, "code-coverage".',
      },
      details_url: {
        type: 'string',
        description: "The URL of the integrator's site that has the full details of the check.",
      },
      external_id: {
        type: 'string',
        description: "A reference for the run on the integrator's system.",
      },
      started_at: {
        type: 'string',
        description: 'This is a timestamp in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.',
      },
      status: {
        enum: ['queued', 'in_progress'],
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
            description: '**Required**.',
          },
          summary: {
            type: 'string',
            description: 'Can contain Markdown.',
          },
          text: {
            type: 'string',
            description: 'Can contain Markdown.',
          },
          annotations: {
            type: 'array',
            description:
              "Adds information from your analysis to specific lines of code. Annotations are visible in GitHub's pull request UI. Annotations are visible in GitHub's pull request UI. The Checks API limits the number of annotations to a maximum of 50 per API request. To create more than 50 annotations, you have to make multiple requests to the Update a check run endpoint. Each time you update the check run, ann…",
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
        required: ['summary'],
      },
      actions: {
        type: 'array',
        description:
          'Possible further actions the integrator can perform, which a user may trigger. Each action includes a `label`, `identifier` and `description`. A maximum of three actions are accepted. To learn more about check runs and requested actions, see "Check runs and requested actions."',
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
    required: ['owner', 'repo', 'check_run_id'],
  },
  request: {
    method: 'PATCH',
    path: '/repos/{owner}/{repo}/check-runs/{check_run_id}',
    body: [
      'name',
      'details_url',
      'external_id',
      'started_at',
      'status',
      'conclusion',
      'completed_at',
      'output',
      'actions',
    ],
  },
});
