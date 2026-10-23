import { defineTool } from '@usemcpkit/core';

export const appsCodespacesCreateWithPrForAuthenticatedUser = defineTool({
  name: 'apps:codespaces:create_with_pr_for_authenticated_user',
  description:
    'Create a codespace from a pull request. Creates a codespace owned by the authenticated user for the specified pull request.',
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
      pull_number: {
        type: 'integer',
        description: 'The number that identifies the pull request.',
      },
      location: {
        type: 'string',
        description:
          'The requested location for a new codespace. Best efforts are made to respect this upon creation. Assigned by IP if not provided.',
      },
      geo: {
        type: 'string',
        description:
          'The geographic area for this codespace. If not specified, the value is assigned by IP. This property replaces `location`, which is closing down.',
        enum: ['EuropeWest', 'SoutheastAsia', 'UsEast', 'UsWest'],
      },
      client_ip: {
        type: 'string',
        description: 'IP for location auto-detection when proxying a request',
      },
      machine: {
        type: 'string',
        description: 'Machine type to use for this codespace',
      },
      devcontainer_path: {
        type: 'string',
        description: 'Path to devcontainer.json config to use for this codespace',
      },
      multi_repo_permissions_opt_out: {
        type: 'boolean',
        description: 'Whether to authorize requested permissions from devcontainer.json',
      },
      working_directory: {
        type: 'string',
        description: 'Working directory for this codespace',
      },
      idle_timeout_minutes: {
        type: 'integer',
        description: 'Time in minutes before codespace stops from inactivity',
      },
      display_name: {
        type: 'string',
        description: 'Display name for this codespace',
      },
      retention_period_minutes: {
        type: 'integer',
        description:
          'Duration in minutes after codespace has gone idle in which it will be deleted. Must be integer minutes between 0 and 43200 (30 days).',
      },
    },
    required: ['owner', 'repo', 'pull_number'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/pulls/{pull_number}/codespaces',
    body: [
      'location',
      'geo',
      'client_ip',
      'machine',
      'devcontainer_path',
      'multi_repo_permissions_opt_out',
      'working_directory',
      'idle_timeout_minutes',
      'display_name',
      'retention_period_minutes',
    ],
  },
});
