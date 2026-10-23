import { defineTool } from '@usemcpkit/core';

export const reposCreateRepoRuleset = defineTool({
  name: 'repos:create_repo_ruleset',
  description: 'Create a repository ruleset. Create a ruleset for a repository.',
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
        description: 'The name of the ruleset.',
      },
      target: {
        type: 'string',
        description: 'The target of the ruleset',
        default: 'branch',
        enum: ['branch', 'tag', 'push'],
      },
      enforcement: {
        type: 'string',
        description:
          'The enforcement level of the ruleset. `evaluate` allows admins to test rules before enforcing them. Admins can view insights on the Rule Insights page (`evaluate` is only available with GitHub Enterprise).',
        enum: ['disabled', 'active', 'evaluate'],
      },
      bypass_actors: {
        type: 'array',
        description: 'The actors that can bypass the rules in this ruleset',
        items: {
          type: 'object',
          description: 'An actor that can bypass rules in a ruleset',
          properties: {
            actor_id: {
              type: 'integer',
              description:
                'The ID of the actor that can bypass a ruleset. Required for `Integration`, `RepositoryRole`, `Team`, and `User` actor types. If `actor_type` is `OrganizationAdmin`, `actor_id` is ignored. If `actor_type` is `DeployKey`, this should be null. `OrganizationAdmin` is not applicable for personal repositories.',
            },
            actor_type: {
              type: 'string',
              description: 'The type of actor that can bypass a ruleset.',
              enum: ['Integration', 'OrganizationAdmin', 'RepositoryRole', 'Team', 'DeployKey', 'User'],
            },
            bypass_mode: {
              type: 'string',
              description:
                'When the specified actor can bypass the ruleset. `pull_request` means that an actor can only bypass rules on pull requests. `pull_request` is not applicable for the `DeployKey` actor type. Also, `pull_request` is only applicable to branch rulesets. When `bypass_mode` is `exempt`, rules will not be run for that actor and a bypass audit entry will not be created.',
              default: 'always',
              enum: ['always', 'pull_request', 'exempt'],
            },
          },
          required: ['actor_type'],
        },
      },
      conditions: {
        type: 'object',
        description: 'Parameters for a repository ruleset ref name condition',
        properties: {
          ref_name: {
            type: 'object',
            properties: {
              include: {
                type: 'array',
                description:
                  'Array of ref names or patterns to include. One of these patterns must match for the condition to pass. Also accepts `~DEFAULT_BRANCH` to include the default branch or `~ALL` to include all branches.',
                items: {
                  type: 'string',
                },
              },
              exclude: {
                type: 'array',
                description:
                  'Array of ref names or patterns to exclude. The condition will not pass if any of these patterns match.',
                items: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      rules: {
        type: 'array',
        description: 'An array of rules within the ruleset.',
        items: {
          type: 'object',
          description: 'A repository rule.',
          properties: {
            type: {
              type: 'string',
              enum: ['max_file_size'],
            },
            parameters: {
              type: 'object',
            },
          },
          required: ['type'],
        },
      },
    },
    required: ['owner', 'repo', 'name', 'enforcement'],
  },
  request: {
    method: 'POST',
    path: '/repos/{owner}/{repo}/rulesets',
    body: ['name', 'target', 'enforcement', 'bypass_actors', 'conditions', 'rules'],
  },
});
