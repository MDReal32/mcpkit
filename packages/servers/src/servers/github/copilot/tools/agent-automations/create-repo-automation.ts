import { defineTool } from '@usemcpkit/core';

export const agentAutomationsCreateRepoAutomation = defineTool({
  name: 'agent_automations:create_repo_automation',
  description:
    'Create an automation for a repository. Creates a new automation in a repository. User-owned automations remain private to their creator. Repository-owned automations are visible to anyone with read access to the repository and manageable by anyone with write access to the repository.',
  input: {
    type: 'object',
    properties: {
      owner: {
        type: 'string',
        description: 'The account owner of the repository. The name is not case sensitive.',
      },
      repo: {
        type: 'string',
        description: 'The name of the repository. The name is not case sensitive.',
      },
      name: {
        type: 'string',
        description: 'The name of the automation.',
      },
      triggers: {
        type: 'object',
        description:
          'Public trigger configuration keyed by stable public trigger identifier. Each trigger has a closed, trigger-specific configuration schema.',
        properties: {
          interval: {
            type: 'object',
            properties: {
              cadence: {
                type: 'array',
                description: 'One or more schedules on which the Automation runs.',
                items: {
                  type: 'string',
                  enum: ['hourly', 'daily', 'weekly'],
                },
              },
              hour_utc: {
                type: 'integer',
                description:
                  'UTC hour anchor (0 through 23) for daily and weekly schedules. Omitted daily and weekly values default to `0` (midnight UTC).',
              },
              day_of_week: {
                type: 'integer',
                description:
                  'UTC weekday anchor for weekly schedules, where `0` is Sunday and `6` is Saturday. Omitted weekly values default to Monday (`1`).',
              },
              minute_utc: {
                type: 'integer',
                description:
                  'UTC minute anchor for daily and weekly schedules. Omitted daily and weekly values default to `0`. Must be omitted whenever `cadence` includes `hourly`.',
                default: 0,
                enum: [0, 15, 30, 45],
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
            required: ['cadence'],
          },
          issue_opened: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          issue_labeled: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              labels: {
                type: 'array',
                description:
                  'Label names matched case-insensitively against the label added by the event. Omit or use an empty array to match every added label.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          workflow_run: {
            type: 'object',
            properties: {
              workflows: {
                type: 'array',
                description: 'Workflow names matched against the name in each workflow YAML file.',
                items: {
                  type: 'string',
                },
              },
              conclusions: {
                type: 'array',
                description: 'Workflow conclusions to match. The current trigger supports failure.',
                items: {
                  type: 'string',
                  enum: ['failure'],
                },
              },
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
            required: ['workflows', 'conclusions'],
          },
          pull_request_opened: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_synchronize: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_merged: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          issue_comment: {
            type: 'object',
            properties: {
              body_substring: {
                type: 'string',
                description: 'A case-insensitive substring matched against the event body.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_comment: {
            type: 'object',
            properties: {
              comment_types: {
                type: 'array',
                description: 'Pull request conversation and inline review comment types to match.',
                items: {
                  type: 'string',
                  enum: ['timeline_comment', 'review_comment'],
                },
              },
              body_substring: {
                type: 'string',
                description: 'A case-insensitive substring matched against the event body.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
            required: ['comment_types'],
          },
          discussion_opened: {
            type: 'object',
            properties: {
              categories: {
                type: 'array',
                description: 'Discussion category names matched case-insensitively.',
                items: {
                  type: 'string',
                },
              },
              body_substring: {
                type: 'string',
                description: 'A case-insensitive substring matched against the event body.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          discussion_updated: {
            type: 'object',
            properties: {
              categories: {
                type: 'array',
                description: 'Discussion category names matched case-insensitively.',
                items: {
                  type: 'string',
                },
              },
              body_substring: {
                type: 'string',
                description: 'A case-insensitive substring matched against the event body.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          discussion_comment: {
            type: 'object',
            properties: {
              comment_types: {
                type: 'array',
                description: 'Top-level discussion comments and replies to match. Omit to match both.',
                items: {
                  type: 'string',
                  enum: ['comment', 'reply'],
                },
              },
              categories: {
                type: 'array',
                description: 'Discussion category names matched case-insensitively.',
                items: {
                  type: 'string',
                },
              },
              body_substring: {
                type: 'string',
                description: 'A case-insensitive substring matched against the event body.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          issue_assigned: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              assignees: {
                type: 'array',
                description: 'Affected assignee logins matched case-insensitively.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_assigned: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              assignees: {
                type: 'array',
                description: 'Affected assignee logins matched case-insensitively.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          sub_issue_added: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_ready_for_review: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_labeled: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              labels: {
                type: 'array',
                description:
                  'Label names matched case-insensitively against the label added by the event. Omit or use an empty array to match every added label.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_merge_conflict: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          pull_request_review_submitted: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              states: {
                type: 'array',
                description: 'Submitted review states to match.',
                items: {
                  type: 'string',
                  enum: ['approved', 'changes_requested', 'commented'],
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
            required: ['states'],
          },
          pull_request_review_requested: {
            type: 'object',
            properties: {
              query: {
                type: 'string',
                description: 'A GitHub issue or pull request search query.',
              },
              paths: {
                type: 'array',
                description: 'Gitignore-style changed-file path globs.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
          },
          automation_completed: {
            type: 'object',
            properties: {
              automation_ids: {
                type: 'array',
                description: 'Upstream Automation IDs in the same repository.',
                items: {
                  type: 'string',
                },
              },
              write_scope: {
                type: 'string',
                description:
                  "Override the Automation `write_scope` for runs started by this trigger. If omitted, the automation's `write_scope` is used. Organization or repository policy may restrict the effective scope to `trigger`.",
                enum: ['trigger', 'repository'],
              },
            },
            required: ['automation_ids'],
          },
        },
      },
      prompt: {
        type: 'string',
        description: 'The prompt template for the automation.',
      },
      model: {
        type: 'string',
        description: 'The model to use for sessions triggered by this automation. Omit to use the platform default.',
      },
      reasoning_effort: {
        type: 'string',
        description:
          'The reasoning effort to use for sessions triggered by this automation. Omit or leave empty for no override. Currently supported values: `none`, `low`, `medium`, `high`, `xhigh`, `max`',
      },
      tools: {
        type: 'array',
        description: 'The tools available to the automation.',
        items: {
          type: 'string',
        },
      },
      allowed_custom_agents: {
        type: 'array',
        description: 'Custom agents (subagents) this automation is allowed to invoke.',
        items: {
          type: 'string',
        },
      },
      enabled: {
        type: 'boolean',
        description: 'Whether the automation should be created enabled. Defaults to true when omitted.',
        default: true,
      },
      owner_type: {
        type: 'string',
        description:
          'Who owns the automation, fixed at creation. `user` keeps it private to its creator and its runs act as that user. `repository` makes it belong to the repository, visible to anyone with read access to the repository and maintainable by anyone with write access to the repository, and its runs act as the Copilot app rather than as a person. `repository` is rejected when repository ownership is not a…',
        default: 'user',
        enum: ['user', 'repository'],
      },
      write_scope: {
        type: 'string',
        description:
          'Controls which repository resources a run may modify. `trigger` limits writes to the resource that started the run, when one exists, and resources created during the run; `repository` allows writes to any resource in the repository. Supported values: `trigger`, `repository`.',
        default: 'trigger',
        enum: ['trigger', 'repository'],
      },
      require_actor_write_permission: {
        type: 'boolean',
        description:
          "When true, event-triggered runs require the event actor to have repo write permission, even when the org's allow_read_access_triggers policy is enabled. Does not apply to interval-scheduled runs, which always run as the automation owner. Defaults to false.",
      },
    },
    required: ['owner', 'repo', 'name', 'prompt'],
  },
  request: {
    method: 'POST',
    path: '/agents/repos/{owner}/{repo}/automations',
    body: [
      'name',
      'triggers',
      'prompt',
      'model',
      'reasoning_effort',
      'tools',
      'allowed_custom_agents',
      'enabled',
      'owner_type',
      'write_scope',
      'require_actor_write_permission',
    ],
  },
});
