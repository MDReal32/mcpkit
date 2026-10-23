import { defineTool } from '@usemcpkit/core';

export const copilotAgentAutomationsEditRepoAutomation = defineTool({
  name: 'copilot:agent_automations:edit_repo_automation',
  description:
    "Edit an automation for a repository. Edits specified fields on an existing automation in a repository. Omitted fields are left unchanged. The automation's `owner_type` is immutable and cannot be changed by this operation.",
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
      automation_id: {
        type: 'string',
        description: 'The unique identifier of the automation.',
      },
      name: {
        type: 'string',
        description: 'The name of the automation.',
      },
      enabled: {
        type: 'boolean',
        description: 'Set to true to enable, false to disable. Omit to leave unchanged.',
      },
      write_scope: {
        type: 'string',
        description:
          'Controls which repository resources a run may modify. `trigger` limits writes to the resource that started the run, when one exists, and resources created during the run; `repository` allows writes to any resource in the repository. Supported values: `trigger`, `repository`. Omit to leave unchanged.',
        enum: ['trigger', 'repository'],
      },
      require_actor_write_permission: {
        type: 'boolean',
        description:
          "When true, event-triggered runs require the event actor to have repo write permission, even when the org's allow_read_access_triggers policy is enabled. Does not apply to interval-scheduled runs, which always run as the automation owner. Omit to leave unchanged.",
      },
      model: {
        type: 'string',
        description:
          'The model to use for sessions triggered by this automation. Omit to leave unchanged. Send an empty string to clear the model and revert to the platform default.',
      },
      reasoning_effort: {
        type: 'string',
        description:
          'The reasoning effort to use for sessions triggered by this automation. Omit to leave unchanged. Send an empty string to clear the override. Currently supported values: `none`, `low`, `medium`, `high`, `xhigh`, `max`',
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
      tools: {
        type: 'array',
        description: 'The tools available to the automation. Send an empty array to clear all tools.',
        items: {
          type: 'string',
        },
      },
      allowed_custom_agents: {
        type: 'array',
        description:
          'Custom agents (subagents) this automation is allowed to invoke. Send an empty array to clear all custom agents.',
        items: {
          type: 'string',
        },
      },
    },
    required: ['owner', 'repo', 'automation_id'],
  },
  request: {
    method: 'PATCH',
    path: '/agents/repos/{owner}/{repo}/automations/{automation_id}',
    body: [
      'name',
      'enabled',
      'write_scope',
      'require_actor_write_permission',
      'model',
      'reasoning_effort',
      'triggers',
      'prompt',
      'tools',
      'allowed_custom_agents',
    ],
  },
});
