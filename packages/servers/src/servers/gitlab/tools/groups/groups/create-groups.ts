import { defineTool } from "@usemcpkit/core";

export const groupsGroupsCreateGroups = defineTool({
  name: "groups:groups:create_groups",
  description: "Create a group. Creates a project group. Available only for users who can create groups.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name of the group",
      },
      path: {
        type: "string",
        description: "The path of the group",
      },
      parent_id: {
        type: "integer",
        description: "The parent group id for creating nested group",
      },
      organization_id: {
        type: "integer",
        description: "The organization id for the group",
      },
      description: {
        type: "string",
        description: "The description of the group",
      },
      visibility: {
        type: "string",
        description: "The visibility of the group",
        enum: ["private", "internal", "public"],
      },
      avatar: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      share_with_group_lock: {
        type: "boolean",
        description: "Prevent sharing a project with another group within this group",
      },
      require_two_factor_authentication: {
        type: "boolean",
        description: "Require all users in this group to setup Two-factor authentication",
      },
      two_factor_grace_period: {
        type: "integer",
        description: "Time before Two-factor authentication is enforced",
      },
      project_creation_level: {
        type: "string",
        description: "Determine if developers can create projects in the group",
        enum: ["noone", "owner", "maintainer", "developer", "administrator"],
      },
      auto_devops_enabled: {
        type: "boolean",
        description: "Default to Auto DevOps pipeline for all projects within this group",
      },
      subgroup_creation_level: {
        type: "string",
        description: "Allowed to create subgroups",
        enum: ["owner", "maintainer"],
      },
      emails_disabled: {
        type: "boolean",
        description: "_(Deprecated)_ Disable email notifications. Use: emails_enabled",
      },
      emails_enabled: {
        type: "boolean",
        description: "Enable email notifications",
      },
      show_diff_preview_in_email: {
        type: "boolean",
        description: "Include the code diff preview in merge request notification emails",
      },
      mentions_disabled: {
        type: "boolean",
        description: "Disable a group from getting mentioned",
      },
      lfs_enabled: {
        type: "boolean",
        description: "Enable/disable LFS for the projects in this group",
      },
      request_access_enabled: {
        type: "boolean",
        description: "Allow users to request member access",
      },
      default_branch: {
        type: "string",
        description: "The default branch of group's projects",
      },
      default_branch_protection: {
        type: "integer",
        description: "Determine if developers can push to default branch",
        enum: [0, 3, 1, 2, 4],
      },
      default_branch_protection_defaults: {
        type: "object",
        description: "Determine if developers can push to default branch",
        properties: {
          allowed_to_push: {
            type: "array",
            description: "An array of access levels allowed to push",
            items: {
              type: "object",
            },
          },
          allow_force_push: {
            type: "boolean",
            description: "Allow force push for all users with push access.",
          },
          allowed_to_merge: {
            type: "array",
            description: "An array of access levels allowed to merge",
            items: {
              type: "object",
            },
          },
          code_owner_approval_required: {
            type: "boolean",
            description: "Require approval from code owners",
          },
          developer_can_initial_push: {
            type: "boolean",
            description: "Allow developers to initial push",
          },
        },
      },
      enabled_git_access_protocol: {
        type: "string",
        description: "Allow only the selected protocols to be used for Git access.",
        enum: ["ssh", "http", "all"],
      },
      crm_enabled: {
        type: "boolean",
        description: "Enable Customer Relations Management for this group",
      },
      resource_access_token_notify_inherited: {
        type: "boolean",
        description: "Send access token expiry notifications to all inherited members of the group",
      },
      lock_resource_access_token_notify_inherited: {
        type: "boolean",
        description: "Prevent subgroups from overriding the access token expiry notification setting",
      },
      membership_lock: {
        type: "boolean",
        description: "Prevent adding new members to projects within this group",
      },
      ldap_cn: {
        type: "string",
        description: "LDAP Common Name. All or none of `ldap_cn`, `ldap_access` must be provided.",
      },
      ldap_access: {
        type: "integer",
        description: "A valid access level. All or none of `ldap_cn`, `ldap_access` must be provided.",
      },
      shared_runners_minutes_limit: {
        type: "integer",
        description: "(admin-only) compute minutes quota for this group",
      },
      extra_shared_runners_minutes_limit: {
        type: "integer",
        description: "(admin-only) Extra compute minutes quota for this group",
      },
      wiki_access_level: {
        type: "string",
        description: "Wiki access level. One of `disabled`, `private` or `enabled`",
        enum: ["disabled", "private", "enabled"],
      },
      duo_availability: {
        type: "string",
        description: "Duo availability. One of `default_on`, `default_off`, `never_on` or `always_on`",
        enum: ["always_on", "default_on", "default_off", "never_on"],
      },
      duo_remote_flows_availability: {
        type: "boolean",
        description: "Enable GitLab Duo remote flows for this group",
      },
      duo_foundational_flows_availability: {
        type: "boolean",
        description: "Enable GitLab foundational Duo flows for this group",
      },
      duo_custom_agents_availability: {
        type: "boolean",
        description: "Enable GitLab Duo custom agents for this group",
      },
      duo_custom_flows_availability: {
        type: "boolean",
        description: "Enable GitLab Duo custom flows for this group",
      },
      duo_external_agents_availability: {
        type: "boolean",
        description: "Enable GitLab Duo external agents for this group",
      },
      tool_approval_for_session_availability: {
        type: "string",
        description: "Tool approval for session availability. One of `default_on`, `default_off` or `never_on`",
        enum: ["default_on", "default_off", "never_on"],
      },
      duo_auto_mode_availability: {
        type: "string",
        description: "Duo auto mode availability. One of `default_on`, `default_off` or `never_on`",
        enum: ["default_on", "default_off", "never_on"],
      },
      amazon_q_auto_review_enabled: {
        type: "boolean",
        description: "Enable Amazon Q auto review for merge request",
      },
      experiment_features_enabled: {
        type: "boolean",
        description: "Enable experiment features for this group",
      },
      model_prompt_cache_enabled: {
        type: "boolean",
        description: "Enable model prompt cache for this group",
      },
      foundational_agents_statuses: {
        type: "array",
        description: "Whether each foundational agent has been enabled or disabled.",
        items: {
          type: "object",
          properties: {
            reference: {
              type: "string",
              description: "Reference of the foundational agent.",
            },
            enabled: {
              type: "boolean",
              description: "Whether foundational agent has been enabled or disabled.",
            },
          },
          required: ["reference", "enabled"],
        },
      },
      ai_settings_attributes: {
        type: "object",
        description: "AI-related settings",
        properties: {
          duo_agent_platform_enabled: {
            type: "boolean",
            description: "Whether Duo Agent Platform features are enabled",
          },
          duo_workflow_mcp_enabled: {
            type: "boolean",
            description: "Enable MCP support for Duo Agent Platform",
          },
          ai_usage_data_collection_enabled: {
            type: "boolean",
            description: "Enable AI usage data collection for this namespace",
          },
          ai_catalog_restricted_to_group_hierarchy: {
            type: "boolean",
            description: "Confine the AI Catalog to items within this top-level group hierarchy",
          },
          web_search_enabled: {
            type: "boolean",
            description: "Allow web search in GitLab Duo Chat for this top-level group",
          },
          foundational_agents_default_enabled: {
            type: "boolean",
            description: "Whether new foundational agents are enabled by default",
          },
          prompt_injection_protection_level: {
            type: "string",
            description: "Prompt injection protection level. One of `no_checks`, `log_only` or `interrupt`",
            enum: ["no_checks", "log_only", "interrupt"],
          },
          include_recommended_allowed: {
            type: "boolean",
            description: "Whether to include recommended domains in the network access allowlist",
          },
          allow_all_unix_sockets: {
            type: "boolean",
            description: "Whether to allow all Unix sockets for network access",
          },
          allow_project_extension: {
            type: "boolean",
            description: "Whether to allow projects to extend the network access domain allowlist",
          },
          minimum_access_level_execute: {
            type: "integer",
            description:
              "The minimum access level required to execute Duo Agent Platform. This field is behind a feature flag.",
            enum: [10, 15, 20, 30, 40, 50],
          },
          minimum_access_level_execute_async: {
            type: "integer",
            description:
              "The minimum access level required to execute Duo Agent Platform features in CI/CD. This field is behind a feature flag.",
            enum: [30, 40, 50],
          },
          minimum_access_level_manage: {
            type: "integer",
            description:
              "The minimum access level required to manage Duo Agent Platform. This field is behind a feature flag.",
            enum: [30, 40, 50],
          },
          minimum_access_level_enable_on_projects: {
            type: "integer",
            description:
              "The minimum access level required to enable Duo Agent Platform. This field is behind a feature flag.",
            enum: [30, 40, 50],
          },
        },
      },
    },
    required: ["name", "path"],
  },
  request: {
    method: "POST",
    path: "/groups",
    body: [
      "name",
      "path",
      "parent_id",
      "organization_id",
      "description",
      "visibility",
      "avatar",
      "share_with_group_lock",
      "require_two_factor_authentication",
      "two_factor_grace_period",
      "project_creation_level",
      "auto_devops_enabled",
      "subgroup_creation_level",
      "emails_disabled",
      "emails_enabled",
      "show_diff_preview_in_email",
      "mentions_disabled",
      "lfs_enabled",
      "request_access_enabled",
      "default_branch",
      "default_branch_protection",
      "default_branch_protection_defaults",
      "enabled_git_access_protocol",
      "crm_enabled",
      "resource_access_token_notify_inherited",
      "lock_resource_access_token_notify_inherited",
      "membership_lock",
      "ldap_cn",
      "ldap_access",
      "shared_runners_minutes_limit",
      "extra_shared_runners_minutes_limit",
      "wiki_access_level",
      "duo_availability",
      "duo_remote_flows_availability",
      "duo_foundational_flows_availability",
      "duo_custom_agents_availability",
      "duo_custom_flows_availability",
      "duo_external_agents_availability",
      "tool_approval_for_session_availability",
      "duo_auto_mode_availability",
      "amazon_q_auto_review_enabled",
      "experiment_features_enabled",
      "model_prompt_cache_enabled",
      "foundational_agents_statuses",
      "ai_settings_attributes",
    ],
    contentType: "multipart/form-data",
    fileArgs: ["avatar"],
  },
});
