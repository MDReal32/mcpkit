import { defineTool } from '@usemcpkit/core';

export const metaInstanceUpdateApplicationSettings = defineTool({
  name: 'meta:instance:update_application_settings',
  description:
    'Update application settings. Updates the current application settings for this GitLab instance. At least one setting must be updated.',
  input: {
    type: 'object',
    properties: {
      admin_mode: {
        type: 'boolean',
        description:
          'If `true`, requires administrators to re-authenticate before performing potentially dangerous administrative operations.',
      },
      admin_notification_email: {
        type: 'string',
        description:
          'If set, abuse reports are sent to this address. Abuse reports are always available in the **Admin** area. Deprecated. Use `abuse_notification_email` instead.',
      },
      abuse_notification_email: {
        type: 'string',
        description:
          'If set, abuse reports are sent to this address. Abuse reports are always available in the **Admin** area.',
      },
      after_sign_up_text: {
        type: 'string',
        description: 'Text shown after sign up.',
      },
      after_sign_out_path: {
        type: 'string',
        description: 'Users are redirected to this page after they sign out.',
      },
      akismet_enabled: {
        type: 'boolean',
        description: 'If `true`, helps prevent bots from creating issues. Requires `akismet_api_key`.',
      },
      akismet_api_key: {
        type: 'string',
        description: 'Generate API key at http://www.akismet.com',
      },
      asset_proxy_enabled: {
        type: 'boolean',
        description: 'Enable proxying of assets',
      },
      asset_proxy_url: {
        type: 'string',
        description: 'URL of the asset proxy server',
      },
      asset_proxy_secret_key: {
        type: 'string',
        description: 'Shared secret with the asset proxy server',
      },
      asset_proxy_whitelist: {
        type: 'array',
        description:
          'Assets that match these domains are not proxied. Wildcards allowed. Your GitLab installation URL is automatically allowlisted. GitLab restart is required to apply changes. Deprecated. Use `asset_proxy_allowlist` instead.',
        items: {
          type: 'string',
        },
      },
      asset_proxy_allowlist: {
        type: 'array',
        description:
          'Assets that match these domains are not proxied. Wildcards allowed. Your GitLab installation URL is automatically allowlisted. GitLab restart is required to apply changes.',
        items: {
          type: 'string',
        },
      },
      authn_data_retention_cleanup_enabled: {
        type: 'boolean',
        description:
          'If `true`, runs cleanup workers that permanently delete authentication login history older than one year, and previously revoked OAuth access tokens and grants older than one month. Introduced in GitLab 18.7.',
      },
      container_registry_token_expire_delay: {
        type: 'integer',
        description: 'Duration, in minutes, that container registry authorization tokens remain valid.',
      },
      oauth_access_token_expires_in: {
        type: 'integer',
        description:
          'Maximum lifetime in seconds of all new OAuth access tokens issued by the instance. Minimum value: `300` (5 minutes). Default value: `7200` (2 hours). If blank or `null`, uses default value. Does not affect existing OAuth access tokens.',
      },
      decompress_archive_file_timeout: {
        type: 'integer',
        description: 'Timeout for decompressing archived files, in seconds. Set to `0` to disable the timeout.',
      },
      default_artifacts_expire_in: {
        type: 'string',
        description: "Set the default expiration time for each job's artifacts.",
      },
      default_ci_config_path: {
        type: 'string',
        description:
          'Default CI/CD configuration file and path for new projects. If empty, new projects use `.gitlab-ci.yml`.',
      },
      default_project_creation: {
        type: 'integer',
        description:
          'Default minimum role required to create projects. Can take: `0` _(No one)_, `1` _(Maintainers)_, `2` _(Developers)_, `3` _(Administrators)_, or `4` _(Owners)_.',
        enum: [0, 3, 4, 1, 2],
      },
      default_remove_source_branch_after_merge: {
        type: 'boolean',
        description: 'Enable the delete source branch option by default for new projects',
      },
      default_branch_protection: {
        type: 'integer',
        description:
          'Level of protection for the default branch. Deprecated in GitLab 17.0. Use `default_branch_protection_defaults` instead.',
        enum: [0, 3, 1, 2, 4],
      },
      default_branch_protection_defaults: {
        type: 'object',
        description:
          'Default branch protection settings. For available options, see Options for `default_branch_protection_defaults`. Introduced in GitLab 17.0.',
        properties: {
          allowed_to_push: {
            type: 'array',
            description: 'Array of access levels allowed to push to the default branch.',
            items: {
              type: 'object',
            },
          },
          allow_force_push: {
            type: 'boolean',
            description: 'If `true`, allows force push for all users with push access.',
          },
          allowed_to_merge: {
            type: 'array',
            description: 'Array of access levels allowed to merge into the default branch.',
            items: {
              type: 'object',
            },
          },
          code_owner_approval_required: {
            type: 'boolean',
            description: 'Require approval from code owners',
          },
          developer_can_initial_push: {
            type: 'boolean',
            description: 'If `true`, allows developers to make the initial push.',
          },
        },
      },
      default_group_visibility: {
        type: 'string',
        description:
          'What visibility level new groups receive. Default is `private`. Cannot be set to any levels in `restricted_visibility_levels`.',
        enum: ['private', 'internal', 'public'],
      },
      default_project_visibility: {
        type: 'string',
        description:
          'What visibility level new projects receive. Default is `private`. Cannot be set to any levels in `restricted_visibility_levels`.',
        enum: ['private', 'internal', 'public'],
      },
      default_projects_limit: {
        type: 'integer',
        description: 'Maximum number of personal projects per user. Default is `100000`.',
      },
      default_snippet_visibility: {
        type: 'string',
        description: 'What visibility level new snippets receive. Default is `private`.',
        enum: ['private', 'internal', 'public'],
      },
      dependency_management_settings: {
        type: 'object',
        description:
          'Dependency management settings. Set `security_update_scheduler_max_concurrency` (integer) to cap the number of security update scheduler jobs that run concurrently across the Sidekiq fleet. Default: `30`. Capped at `200`. Set to `0` to remove the concurrency limit. Ultimate only. Introduced in GitLab 19.1.',
        properties: {
          security_update_scheduler_max_concurrency: {
            type: 'integer',
            description:
              'Maximum number of dependency management security update scheduler jobs to run concurrently across the Sidekiq fleet.',
          },
        },
      },
      disable_admin_oauth_scopes: {
        type: 'boolean',
        description: 'Stop administrators from connecting to non-trusted OAuth applications.',
      },
      disable_feed_token: {
        type: 'boolean',
        description: 'Disable display of RSS/Atom and Calendar `feed_tokens`',
      },
      disabled_oauth_sign_in_sources: {
        type: 'array',
        description: 'OAuth sign-in sources to disable.',
        items: {
          type: 'string',
        },
      },
      domain_denylist_enabled: {
        type: 'boolean',
        description: 'If `true`, enables the domain denylist for sign-ups. Requires `domain_denylist`.',
      },
      domain_denylist: {
        type: 'array',
        description:
          'Users with e-mail addresses that match these domain(s) will NOT be able to sign-up. Wildcards allowed. Enter multiple entries on separate lines. Ex: domain.com, *.domain.com',
        items: {
          type: 'string',
        },
      },
      domain_allowlist: {
        type: 'array',
        description:
          'Only users with email addresses that match these domains can sign up. Wildcards allowed. For example, `domain.com` or `*.domain.com`. If empty, all domains are allowed.',
        items: {
          type: 'string',
        },
      },
      outbound_local_requests_whitelist: {
        type: 'array',
        description:
          'List of trusted domains or IP addresses to which local requests are allowed when local requests for webhooks and integrations are disabled.',
        items: {
          type: 'string',
        },
      },
      email_otp_enabled: {
        type: 'boolean',
        description:
          'If `true`, enables email-based one-time passwords (OTP) as a multi-factor authentication method. Requires `require_email_verification_on_account_locked` to be `true`.',
      },
      iframe_rendering_enabled: {
        type: 'boolean',
        description: 'If `true`, allows rendering of iframes in Markdown.',
      },
      iframe_rendering_allowlist: {
        type: 'array',
        description:
          'IDs of embed providers users can embed content from. Enter multiple entries separated by commas or on separate lines.',
        items: {
          type: 'string',
        },
      },
      iframe_rendering_allowlist_raw: {
        type: 'string',
        description: 'Raw newline- or comma-separated list of IDs of embed providers users can embed content from.',
      },
      eks_integration_enabled: {
        type: 'boolean',
        description: 'Enable integration with Amazon EKS',
      },
      eks_account_id: {
        type: 'string',
        description: 'Amazon account ID for EKS integration.',
      },
      eks_access_key_id: {
        type: 'string',
        description: 'Access key ID for the EKS integration IAM user.',
      },
      eks_secret_access_key: {
        type: 'string',
        description: 'Secret access key for the EKS integration IAM user.',
      },
      email_author_in_body: {
        type: 'boolean',
        description:
          'If `true`, includes the name of the issue, merge request, or comment author in the email body. Useful when email servers do not support overriding the sender name.',
      },
      email_confirmation_setting: {
        type: 'string',
        description:
          'Specifies whether users must confirm their email address before signing in. `off` does not require confirmation, `soft` allows sign-in during a confirmation period, and `hard` requires confirmation before sign-in.',
        enum: ['off', 'soft', 'hard'],
      },
      enabled_git_access_protocol: {
        type: 'string',
        description: 'Protocol allowed for Git access. Set to `all` to allow both SSH and HTTP(S).',
        enum: ['ssh', 'http', 'all'],
      },
      gitpod_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Ona integration. Requires `gitpod_url`.',
      },
      gitpod_url: {
        type: 'string',
        description: 'Ona instance URL for the integration.',
      },
      gitaly_timeout_default: {
        type: 'integer',
        description: 'Default Gitaly timeout, in seconds. Set to `0` to disable timeouts.',
      },
      gitaly_timeout_fast: {
        type: 'integer',
        description: 'Gitaly fast operation timeout, in seconds. Set to 0 to disable timeouts.',
      },
      gitaly_timeout_medium: {
        type: 'integer',
        description: 'Medium Gitaly timeout, in seconds. Set to 0 to disable timeouts.',
      },
      grafana_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Grafana.',
      },
      grafana_url: {
        type: 'string',
        description: 'Grafana URL.',
      },
      gravatar_enabled: {
        type: 'boolean',
        description: 'If `true`, enables the Gravatar service.',
      },
      help_page_hide_commercial_content: {
        type: 'boolean',
        description: 'If `true`, hides marketing-related entries from help.',
      },
      help_page_support_url: {
        type: 'string',
        description: 'Alternate support URL for help page and help dropdown.',
      },
      help_page_documentation_base_url: {
        type: 'string',
        description: 'Alternate documentation pages URL.',
      },
      help_page_text: {
        type: 'string',
        description: 'Custom text displayed on the help page.',
      },
      home_page_url: {
        type: 'string',
        description: 'Users who are not signed in are redirected to this page.',
      },
      housekeeping_enabled: {
        type: 'boolean',
        description: 'Enable automatic repository housekeeping (git repack, git gc)',
      },
      housekeeping_full_repack_period: {
        type: 'integer',
        description:
          'Number of Git pushes after which a full `git repack` is run. Deprecated. Use `housekeeping_optimize_repository_period` instead. All or none of `housekeeping_full_repack_period`, `housekeeping_gc_period`, `housekeeping_incremental_repack_period` must be provided.',
      },
      housekeeping_gc_period: {
        type: 'integer',
        description:
          'Number of Git pushes after which `git gc` is run. Deprecated. Use `housekeeping_optimize_repository_period` instead. All or none of `housekeeping_full_repack_period`, `housekeeping_gc_period`, `housekeeping_incremental_repack_period` must be provided.',
      },
      housekeeping_incremental_repack_period: {
        type: 'integer',
        description:
          'Number of Git pushes after which an incremental `git repack` is run. Deprecated. Use `housekeeping_optimize_repository_period` instead. Exactly one of `housekeeping_incremental_repack_period`, `housekeeping_optimize_repository_period` must be provided. All or none of `housekeeping_full_repack_period`, `housekeeping_gc_period`, `housekeeping_incremental_repack_period` must be provided.',
      },
      housekeeping_optimize_repository_period: {
        type: 'integer',
        description:
          'Number of Git pushes after which Gitaly is asked to optimize a repository. Exactly one of `housekeeping_incremental_repack_period`, `housekeeping_optimize_repository_period` must be provided.',
      },
      html_emails_enabled: {
        type: 'boolean',
        description:
          'If `true`, sends emails in both HTML and plain text formats. If `false`, sends emails in plain text only. Defaults to `true`.',
      },
      import_sources: {
        type: 'array',
        description:
          'Sources to allow project import from. OmniAuth must be configured for GitHub, Bitbucket, and GitLab.com.',
        items: {
          type: 'string',
          enum: ['github', 'bitbucket', 'bitbucket_server', 'fogbugz', 'git', 'gitlab_project', 'gitea', 'manifest'],
        },
      },
      invisible_captcha_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Invisible CAPTCHA spam detection during account creation.',
      },
      max_artifacts_size: {
        type: 'integer',
        description: "Maximum file size, in MB, for each job's artifacts.",
      },
      max_attachment_size: {
        type: 'integer',
        description: 'Maximum attachment size in MB.',
      },
      max_export_size: {
        type: 'integer',
        description: 'Maximum export size in MB',
      },
      max_github_response_size_limit: {
        type: 'integer',
        description: 'Maximum size in MB for GitHub API responses. Set to `0` for unlimited size.',
      },
      max_github_response_json_value_count: {
        type: 'integer',
        description:
          'Maximum object count for GitHub API responses. Set to `0` for unlimited. The count is an estimate based on the number of `:`, `,`, `{`, and `[` characters in the response.',
      },
      max_import_size: {
        type: 'integer',
        description: 'Maximum import size in MB',
      },
      max_import_remote_file_size: {
        type: 'integer',
        description: 'Maximum remote file size in MB for imports from external object storages',
      },
      max_decompressed_archive_size: {
        type: 'integer',
        description:
          'Maximum decompressed file size for imported archives in MB. Set to `0` for unlimited. Default is `25600`.',
      },
      max_pages_size: {
        type: 'integer',
        description: 'Maximum size of each GitLab Pages site in MB. Set to `0` to allow up to 1 TB.',
      },
      max_pages_custom_domains_per_project: {
        type: 'integer',
        description: 'Maximum number of GitLab Pages custom domains per project',
      },
      max_terraform_state_size_bytes: {
        type: 'integer',
        description: 'Maximum size of the Terraform state file in bytes. Set to `0` for unlimited size.',
      },
      metrics_method_call_threshold: {
        type: 'integer',
        description: 'Method call is only tracked if it takes longer than this threshold, in milliseconds.',
      },
      password_authentication_enabled: {
        type: 'boolean',
        description:
          'Flag indicating if password authentication is enabled for the web interface. Mutually exclusive with `password_authentication_enabled_for_web`, `signin_enabled`.',
      },
      password_authentication_enabled_for_web: {
        type: 'boolean',
        description:
          'If `true`, enables authentication for the web interface via a GitLab account password. Defaults to `true`. Mutually exclusive with `password_authentication_enabled`, `signin_enabled`.',
      },
      signin_enabled: {
        type: 'boolean',
        description:
          'If `true`, enables password authentication for the web interface. Deprecated. Use `password_authentication_enabled_for_web` instead. Mutually exclusive with `password_authentication_enabled_for_web`, `password_authentication_enabled`.',
      },
      password_authentication_enabled_for_git: {
        type: 'boolean',
        description:
          'If `true`, enables authentication for Git over HTTP(S) via a GitLab account password. Defaults to `true`.',
      },
      performance_bar_allowed_group_id: {
        type: 'string',
        description:
          'Path of the group that is allowed to toggle the performance bar. Deprecated. Use `performance_bar_allowed_group_path` instead.',
      },
      performance_bar_allowed_group_path: {
        type: 'string',
        description: 'Path of the group that is allowed to toggle the performance bar.',
      },
      performance_bar_enabled: {
        type: 'string',
        description:
          'Deprecated: Pass `performance_bar_allowed_group_path: nil` instead. Allow enabling the performance.',
      },
      personal_access_token_prefix: {
        type: 'string',
        description: 'Prefix to prepend to all personal access tokens.',
      },
      require_personal_access_token_expiry: {
        type: 'boolean',
        description:
          'If `true`, requires an expiration date on group and project access tokens, and on personal access tokens not owned by service accounts.',
      },
      kroki_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Kroki integration. Requires `kroki_url`.',
      },
      kroki_url: {
        type: 'string',
        description: 'Kroki server URL.',
      },
      plantuml_enabled: {
        type: 'boolean',
        description: 'If `true`, enables PlantUML integration. Requires `plantuml_url`.',
      },
      plantuml_url: {
        type: 'string',
        description: 'The PlantUML server URL',
      },
      diagramsnet_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Diagrams.net integration. Requires `diagramsnet_url`. Defaults to `true`.',
      },
      diagramsnet_url: {
        type: 'string',
        description: 'The Diagrams.net server URL',
      },
      polling_interval_multiplier: {
        type: 'number',
        description: 'Interval multiplier used by endpoints that perform polling. Set to `0` to disable polling.',
      },
      project_export_enabled: {
        type: 'boolean',
        description: 'If `true`, enables project export.',
      },
      prometheus_metrics_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Prometheus metrics.',
      },
      push_event_hooks_limit: {
        type: 'integer',
        description:
          'Maximum number of changes (branches or tags) in a single push above which webhooks and integrations are not triggered. Setting to `0` does not disable throttling. Default: `3`.',
      },
      push_event_activities_limit: {
        type: 'integer',
        description:
          'Maximum number of changes (branches or tags) in a single push above which a bulk push event is created. Setting to `0` does not disable throttling.',
      },
      recaptcha_enabled: {
        type: 'boolean',
        description: 'If `true`, enables reCAPTCHA. Requires `recaptcha_private_key` and `recaptcha_site_key`.',
      },
      recaptcha_site_key: {
        type: 'string',
        description: 'Generate site key at http://www.google.com/recaptcha',
      },
      recaptcha_private_key: {
        type: 'string',
        description: 'Generate private key at http://www.google.com/recaptcha',
      },
      login_recaptcha_protection_enabled: {
        type: 'boolean',
        description: 'Helps prevent brute-force attacks',
      },
      repository_checks_enabled: {
        type: 'boolean',
        description:
          'If `true`, GitLab periodically runs `git fsck` in all project and wiki repositories to look for silent disk corruption issues.',
      },
      repository_storages_weighted: {
        type: 'object',
        description:
          'Hash of names of storages taken from `gitlab.yml` to weights ranging from 0 to 100. New projects are created in one of these stores, chosen by a weighted random selection.',
      },
      require_two_factor_authentication: {
        type: 'boolean',
        description:
          'If `true`, requires all users to set up two-factor authentication. Requires `two_factor_grace_period`.',
      },
      two_factor_grace_period: {
        type: 'integer',
        description: 'Amount of time, in hours, that users can skip enforced two-factor authentication setup.',
      },
      restricted_visibility_levels: {
        type: 'array',
        description:
          'Selected levels cannot be used by non-administrator users for groups, projects, or snippets. Can take `private`, `internal`, and `public` as a parameter. If the `public` level is restricted, user profiles are only visible to signed-in users. If empty, no levels are restricted. Cannot select levels that are set as `default_project_visibility` and `default_group_visibility`.',
        items: {
          type: 'string',
        },
      },
      session_expire_delay: {
        type: 'integer',
        description: 'Session duration in minutes. Requires a GitLab restart to apply changes.',
      },
      session_expire_from_init: {
        type: 'boolean',
        description:
          'If `true`, sessions expire a number of minutes after the session was created rather than after the last activity. The session lifetime is defined by `session_expire_delay`.',
      },
      shared_runners_enabled: {
        type: 'boolean',
        description: 'Enable shared runners for new projects',
      },
      shared_runners_text: {
        type: 'string',
        description: 'Shared runners text',
      },
      valid_runner_registrars: {
        type: 'array',
        description:
          "List of types which are allowed to register a GitLab Runner. Can be `[]`, `['group']`, `['project']`, or `['group', 'project']`.",
        items: {
          type: 'string',
        },
      },
      signup_enabled: {
        type: 'boolean',
        description: 'If `true`, enables registration. Defaults to `true`.',
      },
      sourcegraph_enabled: {
        type: 'boolean',
        description: 'If `true`, enables Sourcegraph integration. Requires `sourcegraph_url`.',
      },
      sourcegraph_public_only: {
        type: 'boolean',
        description:
          'If `true`, blocks Sourcegraph from being loaded on private and internal projects. Defaults to `true`.',
      },
      sourcegraph_url: {
        type: 'string',
        description: 'Configured Sourcegraph instance URL.',
      },
      spam_check_endpoint_enabled: {
        type: 'boolean',
        description: 'Enable Spam Check via external API endpoint',
      },
      spam_check_endpoint_url: {
        type: 'string',
        description:
          'URL of the external Spamcheck service endpoint. Valid URI schemes are `grpc` or `tls`. Specifying `tls` forces communication to be encrypted.',
      },
      terminal_max_session_time: {
        type: 'integer',
        description: 'Maximum time for a web terminal WebSocket connection, in seconds. Set to `0` for unlimited time.',
      },
      usage_ping_enabled: {
        type: 'boolean',
        description: 'Every week GitLab will report license usage back to GitLab, Inc.',
      },
      local_markdown_version: {
        type: 'integer',
        description: 'Local Markdown version. Increase this value to invalidate all cached Markdown.',
      },
      allow_local_requests_from_hooks_and_services: {
        type: 'boolean',
        description:
          'If `true`, allows requests to the local network from webhooks and integrations. Deprecated. Use `allow_local_requests_from_web_hooks_and_services` instead.',
      },
      mailgun_events_enabled: {
        type: 'boolean',
        description: 'Enable Mailgun event receiver',
      },
      mailgun_signing_key: {
        type: 'string',
        description: 'Mailgun HTTP webhook signing key for receiving events from webhook.',
      },
      snowplow_enabled: {
        type: 'boolean',
        description: 'Enable Snowplow tracking',
      },
      snowplow_collector_hostname: {
        type: 'string',
        description: 'The Snowplow collector hostname',
      },
      snowplow_cookie_domain: {
        type: 'string',
        description: 'Snowplow cookie domain, for example `.gitlab.com`.',
      },
      snowplow_app_id: {
        type: 'string',
        description: 'Snowplow site name or application ID, for example `gitlab`.',
      },
      issues_create_limit: {
        type: 'integer',
        description:
          'Maximum number of issue creation requests allowed per minute per user. Set to 0 for unlimited requests per minute.',
      },
      raw_blob_request_limit: {
        type: 'integer',
        description:
          'Maximum number of requests per minute for each raw path (default is `300`). Set to `0` to disable throttling.',
      },
      raw_blob_request_limit_unauthenticated: {
        type: 'integer',
        description:
          'Maximum number of unauthenticated requests per minute across all raw paths in a project (default is `800`). Set to `0` to disable throttling.',
      },
      wiki_page_max_content_bytes: {
        type: 'integer',
        description:
          'Maximum wiki page content size in bytes. Default: 5242880 bytes (5 MB). The minimum value is 1024 bytes.',
      },
      description_and_note_max_size: {
        type: 'integer',
        description:
          'Maximum work item, merge request, and vulnerability description and comment content size in bytes.',
      },
      wiki_asciidoc_allow_uri_includes: {
        type: 'boolean',
        description: 'If `true`, allows URI includes for AsciiDoc wiki pages.',
      },
      require_admin_approval_after_user_signup: {
        type: 'boolean',
        description: 'If `true`, requires explicit administrator approval for new signups.',
      },
      whats_new_variant: {
        type: 'string',
        description:
          "Which features What's new shows. `all_tiers` shows features for all tiers, `current_tier` shows only features for the instance's tier, and `disabled` hides What's new.",
        enum: ['all_tiers', 'current_tier', 'disabled'],
      },
      floc_enabled: {
        type: 'boolean',
        description: 'If `true`, enables FloC (Federated Learning of Cohorts).',
      },
      user_deactivation_emails_enabled: {
        type: 'boolean',
        description: 'If `true`, sends emails to users when their account is deactivated.',
      },
      show_migrate_from_jenkins_banner: {
        type: 'boolean',
        description: 'If `true`, shows the Jenkins migration banner.',
      },
      enable_artifact_external_redirect_warning_page: {
        type: 'boolean',
        description:
          'If `true`, shows the external redirect page that warns about user-generated content in GitLab Pages.',
      },
      users_get_by_id_limit: {
        type: 'integer',
        description:
          'Maximum number of calls to the `/users/:id` API per 10 minutes per user. Set to `0` for unlimited requests.',
      },
      runner_token_expiration_interval: {
        type: 'integer',
        description:
          'Set the expiration time (in seconds) of authentication tokens of newly registered instance runners. Minimum value is 7200 seconds. For more information, see Automatically rotate authentication tokens.',
      },
      group_runner_token_expiration_interval: {
        type: 'integer',
        description:
          'Set the expiration time (in seconds) of authentication tokens of newly registered group runners. Minimum value is 7200 seconds. For more information, see Automatically rotate authentication tokens.',
      },
      project_runner_token_expiration_interval: {
        type: 'integer',
        description:
          'Set the expiration time (in seconds) of authentication tokens of newly registered project runners. Minimum value is 7200 seconds. For more information, see Automatically rotate authentication tokens.',
      },
      pipeline_limit_per_project_user_sha: {
        type: 'integer',
        description:
          'Maximum number of pipeline creation requests per minute per user and commit. Set to `0` for unlimited requests. Disabled by default.',
      },
      pipeline_limit_per_user: {
        type: 'integer',
        description:
          'Maximum number of pipeline creation requests allowed per minute per user. Set to `0` for unlimited requests.',
      },
      ci_lint_limit_per_user: {
        type: 'integer',
        description:
          'Maximum number of CI Lint requests per minute per user. Set to `0` for unlimited requests. Disabled by default.',
      },
      jira_connect_application_key: {
        type: 'string',
        description: 'ID of the OAuth application used to authenticate with the GitLab for Jira Cloud app.',
      },
      jira_connect_public_key_storage_enabled: {
        type: 'boolean',
        description: 'If `true`, enables public key storage for the GitLab for Jira Cloud app.',
      },
      jira_connect_proxy_url: {
        type: 'string',
        description: 'URL of the GitLab instance used as a proxy for the GitLab for Jira Cloud app.',
      },
      jira_forge_app_id: {
        type: 'string',
        description:
          'Atlassian Forge app ID (ARI) of the GitLab for Jira Cloud app, used to verify inbound Forge Invocation Tokens.',
      },
      bulk_import_concurrent_pipeline_batch_limit: {
        type: 'integer',
        description: 'Maximum number of simultaneous direct transfer batch exports to process.',
      },
      concurrent_relation_batch_export_limit: {
        type: 'integer',
        description: 'Maximum number of simultaneous batch export jobs to process.',
      },
      project_relations_export_limit: {
        type: 'integer',
        description:
          'Maximum number of project relations export requests per minute per user for each project during direct transfer migrations. Set to `0` to disable the rate limit.',
      },
      project_relations_export_download_limit: {
        type: 'integer',
        description:
          'Maximum number of project relations export downloads per minute per user for each project during direct transfer migrations. Set to `0` to disable the rate limit.',
      },
      group_relations_export_limit: {
        type: 'integer',
        description:
          'Maximum number of group relations export requests per minute per user for each group during direct transfer migrations. Set to `0` to disable the rate limit.',
      },
      group_relations_export_download_limit: {
        type: 'integer',
        description:
          'Maximum number of group relations export downloads per minute per user for each group during direct transfer migrations. Set to `0` to disable the rate limit.',
      },
      bulk_import_enabled: {
        type: 'boolean',
        description: 'If `true`, enables migrating GitLab groups and projects by direct transfer.',
      },
      bulk_import_max_download_file: {
        type: 'integer',
        description:
          'Maximum download file size, in MB, when importing from source GitLab instances by direct transfer.',
      },
      autocomplete_users_limit: {
        type: 'integer',
        description: 'Maximum number of authenticated requests per minute per user to the users autocomplete endpoint.',
      },
      autocomplete_users_unauthenticated_limit: {
        type: 'integer',
        description:
          'Maximum number of unauthenticated requests per minute per IP address to the users autocomplete endpoint.',
      },
      concurrent_github_import_jobs_limit: {
        type: 'integer',
        description: 'Maximum number of simultaneous import jobs for the GitHub importer. Default is `1000`.',
      },
      concurrent_bitbucket_import_jobs_limit: {
        type: 'integer',
        description: 'Maximum number of simultaneous import jobs for the Bitbucket Cloud importer. Default is `100`.',
      },
      concurrent_bitbucket_server_import_jobs_limit: {
        type: 'integer',
        description: 'Maximum number of simultaneous import jobs for the Bitbucket Server importer. Default is `100`.',
      },
      concurrent_pull_request_import_jobs_limit: {
        type: 'integer',
        description:
          'Maximum number of simultaneous pull request import jobs for the GitHub, Bitbucket Cloud, and Bitbucket Server importers. Default is `200`.',
      },
      allow_runner_registration_token: {
        type: 'boolean',
        description: 'If `true`, allows using a registration token to create a runner. Defaults to `true`.',
      },
      ci_max_includes: {
        type: 'integer',
        description: 'Maximum number of includes per pipeline. Default is `150`.',
      },
      ci_max_caches_per_job: {
        type: 'integer',
        description: 'Maximum number of caches that can be defined in a single CI/CD job.',
      },
      ci_job_live_trace_enabled: {
        type: 'boolean',
        description:
          'If `true`, turns on incremental logging for job logs. Archived job logs are incrementally uploaded to object storage, which must be configured.',
      },
      ci_job_trace_update_interval: {
        type: 'integer',
        description: 'Job log update interval when the job log is not open, in seconds.',
      },
      ci_job_trace_update_interval_when_being_watched: {
        type: 'integer',
        description: 'Job log update interval when the job log is open, in seconds.',
      },
      git_push_pipeline_limit: {
        type: 'integer',
        description:
          'Maximum number of branch or tag pipelines that can be triggered by a single Git push. Set to `0` to disable the limit.',
      },
      security_policy_global_group_approvers_enabled: {
        type: 'boolean',
        description:
          'If `true`, looks up merge request approval policy approval groups globally. If `false`, looks them up within project hierarchies.',
      },
      slack_app_enabled: {
        type: 'boolean',
        description:
          'If `true`, enables the GitLab for Slack app. Requires `slack_app_id`, `slack_app_secret`, `slack_app_signing_secret`, and `slack_app_verification_token`.',
      },
      slack_app_id: {
        type: 'string',
        description: 'Client ID of the GitLab for Slack app.',
      },
      slack_app_secret: {
        type: 'string',
        description: 'Client secret of the GitLab for Slack app. Used for authenticating OAuth requests from the app.',
      },
      slack_app_signing_secret: {
        type: 'string',
        description: 'Signing secret of the GitLab for Slack app. Used for authenticating API requests from the app.',
      },
      slack_app_verification_token: {
        type: 'string',
        description:
          'Verification token of the GitLab for Slack app. This method of authentication is deprecated by Slack and used only for authenticating slash commands from the app.',
      },
      namespace_aggregation_schedule_lease_duration_in_seconds: {
        type: 'integer',
        description: 'Maximum duration, in seconds, between refreshes of namespace statistics. Defaults to `300`.',
      },
      project_jobs_api_rate_limit: {
        type: 'integer',
        description: 'Maximum authenticated requests to /project/:id/jobs per minute',
      },
      security_txt_content: {
        type: 'string',
        description:
          'Public security contact information made available at https://gitlab.example.com/.well-known/security.txt.',
      },
      downstream_pipeline_trigger_limit_per_project_user_sha: {
        type: 'integer',
        description:
          'Maximum number of downstream pipelines that can be triggered per minute for a given project, user, and commit. Default: `0` (no restriction).',
      },
      pipeline_cancel_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of pipeline cancellations allowed per minute for a given project.',
      },
      pipeline_retry_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of pipeline retries allowed per minute for a given project.',
      },
      job_retry_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of job retries allowed per minute for a given project.',
      },
      job_play_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of manual job runs allowed per minute for a given project.',
      },
      pipeline_delete_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of pipeline deletions allowed per minute for a given project.',
      },
      job_erase_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of job erasures allowed per minute for a given project.',
      },
      job_cancel_limit_per_user_project: {
        type: 'integer',
        description: 'Maximum number of job cancellations allowed per minute for a given project.',
      },
      ai_action_api_rate_limit: {
        type: 'integer',
        description: 'Maximum requests a user can make per 8 hours to aiAction endpoint',
      },
      code_suggestions_api_rate_limit: {
        type: 'integer',
        description: 'Maximum number of requests a user can make to the code suggestions endpoint per minute.',
      },
      resource_usage_limits: {
        type: 'object',
        description: 'Definition for resource usage limits enforced in Sidekiq workers.',
      },
      code_dropdown_custom_clients: {
        type: 'array',
        description: 'Custom "Open with" clients shown in the project Code dropdown list',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name shown to users in the Code dropdown list',
            },
            ssh_url_template: {
              type: 'string',
              description: 'URL template opened for the SSH clone URL. Must contain {url} exactly once',
            },
            http_url_template: {
              type: 'string',
              description: 'URL template opened for the HTTPS clone URL. Must contain {url} exactly once',
            },
          },
          required: ['name'],
        },
      },
      vscode_extension_marketplace: {
        type: 'object',
        description: 'Settings for VS Code Extension Marketplace.',
        properties: {
          enabled: {
            type: 'boolean',
            description: 'If `true`, enables the VS Code extension marketplace for the Web IDE and Workspaces.',
          },
          preset: {
            type: 'string',
            description: "The preset configuration of URL's for the VS Code Extension Marketplace",
          },
          custom_values: {
            type: 'object',
            description: "VS Code Extension Marketplace URL's when preset is 'custom'",
          },
        },
      },
      enable_language_server_restrictions: {
        type: 'boolean',
        description: 'Enables enforcing language server restrictions',
      },
      minimum_language_server_version: {
        type: 'string',
        description: 'Minimum language server version to accept requests from.',
      },
      terraform_state_encryption_enabled: {
        type: 'boolean',
        description: 'Enable encryption for Terraform state files',
      },
      logging_field_schema_version: {
        type: 'integer',
        description: 'Logging field schema version (v0, v1, …). Cannot be downgraded.',
        enum: [0, 1],
      },
      logging_field_dual_emit_target: {
        type: 'integer',
        description:
          'Version to dual-emit alongside schema_version. Must be strictly greater than schema_version, or omit/null to disable.',
        enum: [1],
      },
      rsa_key_restriction: {
        type: 'integer',
        description: 'Restrictions on the complexity of uploaded RSA keys. A value of -1 disables all RSA keys.',
        enum: [0, 1024, 2048, 3072, 4096, -1],
      },
      dsa_key_restriction: {
        type: 'integer',
        description: 'Restrictions on the complexity of uploaded DSA keys. A value of -1 disables all DSA keys.',
        enum: [0, 1024, 2048, 3072, -1],
      },
      ecdsa_key_restriction: {
        type: 'integer',
        description: 'Restrictions on the complexity of uploaded ECDSA keys. A value of -1 disables all ECDSA keys.',
        enum: [0, 256, 384, 521, -1],
      },
      ed25519_key_restriction: {
        type: 'integer',
        description:
          'Restrictions on the complexity of uploaded ED25519 keys. A value of -1 disables all ED25519 keys.',
        enum: [0, 256, -1],
      },
      ecdsa_sk_key_restriction: {
        type: 'integer',
        description:
          'Restrictions on the complexity of uploaded ECDSA_SK keys. A value of -1 disables all ECDSA_SK keys.',
        enum: [0, 256, -1],
      },
      ed25519_sk_key_restriction: {
        type: 'integer',
        description:
          'Restrictions on the complexity of uploaded ED25519_SK keys. A value of -1 disables all ED25519_SK keys.',
        enum: [0, 256, -1],
      },
      allow_account_deletion: {
        type: 'string',
        description: 'If `true`, allows users to delete their accounts. Premium and Ultimate only.',
      },
      allow_application_default_credentials_for_offline_transfer: {
        type: 'string',
        description:
          'If `true`, allows Google Cloud Application Default Credentials for offline transfer. Even when enabled, only administrators can use these credentials, and the bucket name must start with `gitlab-offline-transfer-`. Has no effect on GitLab.com. For more information, see Allow application default credentials for offline transfer. Introduced in GitLab 19.3.',
      },
      allow_bypass_placeholder_confirmation: {
        type: 'string',
        description:
          'If `true`, skips confirmation when administrators reassign placeholder users. Introduced in GitLab 18.0.',
      },
      allow_local_requests_from_system_hooks: {
        type: 'string',
        description: 'If `true`, allows requests to the local network from system hooks.',
      },
      allow_local_requests_from_web_hooks_and_services: {
        type: 'string',
        description: 'If `true`, allows requests to the local network from webhooks and integrations.',
      },
      allow_project_creation_for_guest_and_below: {
        type: 'string',
        description:
          'If `true`, users assigned up to the Guest role can create groups and personal projects. Defaults to `true`.',
      },
      allow_s3_compatible_storage_for_offline_transfer: {
        type: 'string',
        description: 'If `true`, allows S3-compatible object storage for offline transfer. Introduced in GitLab 18.9.',
      },
      archive_builds_in_human_readable: {
        type: 'string',
        description:
          'Set the duration for which the jobs are considered as old and expired. After that time passes, the jobs are archived and no longer able to be retried. Make it empty to never expire jobs. It has to be no less than 1 day, for example: `15 days`, `1 month`, `2 years`.',
      },
      asciidoc_max_includes: {
        type: 'string',
        description:
          'Maximum number of AsciiDoc include directives processed in any one document. Default: `32`. Maximum: `64`.',
      },
      authorized_keys_enabled: {
        type: 'string',
        description:
          'If `true`, GitLab uses the `authorized_keys` file to authenticate SSH keys, which supports Git over SSH without additional configuration. Disable only if you have configured your OpenSSH server to use `AuthorizedKeysCommand`. Defaults to `true`.',
      },
      auto_accept_awarded_achievements: {
        type: 'string',
        description:
          'If `true`, newly awarded achievements are accepted automatically and appear on user profiles immediately. Does not affect achievements awarded before this setting is enabled. Recipients can still hide any achievement. Default value: `false`. Introduced in GitLab 19.4.',
      },
      auto_devops_domain: {
        type: 'string',
        description: "Specify a domain to use by default for every project's Auto Review Apps and Auto Deploy stages.",
      },
      auto_devops_enabled: {
        type: 'string',
        description:
          'If `true`, enables Auto DevOps for projects by default. Auto DevOps automatically builds, tests, and deploys applications based on a predefined CI/CD configuration.',
      },
      bulk_import_max_download_file_size: {
        type: 'string',
        description: 'Maximum download file size when importing from source GitLab instances by direct transfer.',
      },
      can_create_group: {
        type: 'string',
        description: 'If `true`, users can create top-level groups. Defaults to `true`.',
      },
      ci_delete_pipelines_in_seconds_limit_human_readable: {
        type: 'string',
        description: 'Maximum value that is allowed for configuring pipeline retention. Defaults to `1 year`.',
      },
      ci_max_total_yaml_size_bytes: {
        type: 'string',
        description:
          'Maximum amount of memory, in bytes, that can be allocated for the pipeline configuration, with all included YAML configuration files.',
      },
      ci_partitions_in_seconds_limit: {
        type: 'string',
        description:
          'Time window, in seconds, before new CI partitions are created and the system switches to the next set of partitions. Must be between 1 month and 6 months. Default is 1 month (`2592000`). Write-only. Not returned in GET responses. Deprecated. Use `ci_partitions_in_seconds_limit_human_readable` instead. Scheduled for removal in API v5.',
      },
      ci_partitions_in_seconds_limit_human_readable: {
        type: 'string',
        description:
          'Time window before new CI partitions are created and the system switches to the next set of partitions. Must be between `1 month` and `6 months`. Defaults to `1 month`.',
      },
      commit_email_hostname: {
        type: 'string',
        description: 'Custom hostname (for private commit emails).',
      },
      container_expiration_policies_enable_historic_entries: {
        type: 'string',
        description: 'If `true`, enables cleanup policies for all projects.',
      },
      container_registry_cleanup_tags_service_max_list_size: {
        type: 'string',
        description: 'Maximum number of tags that can be deleted in a single execution of cleanup policies.',
      },
      container_registry_delete_tags_service_timeout: {
        type: 'string',
        description:
          'Maximum time, in seconds, that the cleanup process can take to delete a batch of tags for cleanup policies.',
      },
      container_registry_expiration_policies_caching: {
        type: 'string',
        description: 'If `true`, enables caching during the execution of cleanup policies.',
      },
      container_registry_expiration_policies_worker_capacity: {
        type: 'string',
        description: 'Number of workers for cleanup policies.',
      },
      custom_http_clone_url_root: {
        type: 'string',
        description: 'Set a custom Git clone URL for HTTP(S).',
      },
      default_branch_name: {
        type: 'string',
        description: 'Set the initial branch name for all projects in an instance.',
      },
      default_dark_syntax_highlighting_theme: {
        type: 'string',
        description:
          'Default dark mode syntax highlighting theme for users who are new or not signed in. See IDs of available themes.',
      },
      default_preferred_language: {
        type: 'string',
        description: 'Default preferred language for users who are not logged in.',
      },
      default_syntax_highlighting_theme: {
        type: 'string',
        description:
          'Default syntax highlighting theme for users who are new or not signed in. See IDs of available themes.',
      },
      delete_inactive_projects: {
        type: 'string',
        description: 'Enable dormant project deletion. Default is `false`.',
      },
      deletion_adjourned_period: {
        type: 'string',
        description:
          'Number of days to wait before deleting a project or group that is marked for deletion. Value must be between `1` and `90`. Defaults to `30`.',
      },
      diff_max_commits: {
        type: 'string',
        description: 'Maximum number of diff commits per merge request.',
      },
      diff_max_files: {
        type: 'string',
        description: 'Maximum number of files in a diff.',
      },
      diff_max_lines: {
        type: 'string',
        description: 'Maximum number of lines in a diff.',
      },
      diff_max_patch_bytes: {
        type: 'string',
        description: 'Maximum diff patch size, in bytes.',
      },
      diff_max_versions: {
        type: 'string',
        description: 'Maximum number of diff versions per merge request.',
      },
      disable_password_authentication_for_users_with_sso_identities: {
        type: 'string',
        description:
          'Disable password authentication in the web interface for users with an SSO identity. This does not affect Git operations over HTTP(S). Default is `false`.',
      },
      dns_rebinding_protection_enabled: {
        type: 'string',
        description: 'If `true`, enforces DNS-rebinding attack protection.',
      },
      email_restrictions: {
        type: 'string',
        description: 'Regular expression that is checked against the email used during registration.',
      },
      email_restrictions_enabled: {
        type: 'string',
        description:
          'If `true`, prevents new users from signing up with an email address that matches the `email_restrictions` regular expression.',
      },
      enforce_terms: {
        type: 'string',
        description: 'If `true`, enforces the application terms of service for all users. Requires `terms`.',
      },
      external_auth_client_cert: {
        type: 'string',
        description:
          'Certificate to use to authenticate with the external authorization service. Requires `external_auth_client_key`.',
      },
      external_auth_client_key: {
        type: 'string',
        description:
          'Private key for the certificate when authentication is required for the external authorization service. Encrypted when stored.',
      },
      external_auth_client_key_pass: {
        type: 'string',
        description:
          'Passphrase to use for the private key when authenticating with the external authorization service. Encrypted when stored.',
      },
      external_authorization_service_default_label: {
        type: 'string',
        description:
          'Default classification label to use when requesting authorization and no classification label has been specified on the project.',
      },
      external_authorization_service_enabled: {
        type: 'string',
        description:
          'If `true`, uses an external authorization service for accessing projects. Requires `external_authorization_service_default_label`, `external_authorization_service_timeout`, and `external_authorization_service_url`.',
      },
      external_authorization_service_timeout: {
        type: 'string',
        description:
          'The timeout after which an authorization request is aborted, in seconds. When a request times out, access is denied to the user. (min: 0.001, max: 10, step: 0.001).',
      },
      external_authorization_service_url: {
        type: 'string',
        description: 'URL to which authorization requests are directed.',
      },
      external_pipeline_validation_service_timeout: {
        type: 'string',
        description:
          'Time to wait for a response from the pipeline validation service, in seconds. Assumes `OK` if it times out.',
      },
      external_pipeline_validation_service_token: {
        type: 'string',
        description:
          'Token to include as the `X-Gitlab-Token` header in requests to the URL in `external_pipeline_validation_service_url`.',
      },
      external_pipeline_validation_service_url: {
        type: 'string',
        description: 'URL to use for pipeline validation requests.',
      },
      failed_login_attempts_unlock_period_in_minutes: {
        type: 'string',
        description:
          'Time period in minutes after which the user is unlocked when maximum number of failed sign-in attempts reached.',
      },
      first_day_of_week: {
        type: 'string',
        description:
          'Start day of the week for calendar views and date pickers. Valid values are `0` (default) for Sunday, `1` for Monday, and `6` for Saturday.',
      },
      gitlab_dedicated_instance: {
        type: 'string',
        description: 'If `true`, the instance was provisioned for GitLab Dedicated.',
      },
      gitlab_environment_toolkit_instance: {
        type: 'string',
        description:
          'If `true`, the instance was provisioned with the GitLab Environment Toolkit for Service Ping reporting.',
      },
      gitlab_product_usage_data_enabled: {
        type: 'string',
        description:
          'If `true`, product usage data collection is enabled. When the `GITLAB_PRODUCT_USAGE_DATA_ENABLED` environment variable is set, the API returns the effective value from the environment variable.',
      },
      gitlab_shell_operation_limit: {
        type: 'string',
        description: 'Maximum number of Git operations per minute a user can perform. Default: `600`.',
      },
      hashed_storage_enabled: {
        type: 'string',
        description:
          'Create new projects using hashed storage paths: Enable immutable, hash-based paths and repository names to store repositories on disk. This prevents repositories from having to be moved or renamed when the Project URL changes and may improve disk I/O performance. (Always enabled in GitLab versions 13.0 and later, configuration is scheduled for removal in 14.0)',
      },
      hide_third_party_offers: {
        type: 'string',
        description: 'If `true`, hides offers from third parties in GitLab.',
      },
      inactive_projects_delete_after_months: {
        type: 'string',
        description:
          'If `delete_inactive_projects` is `true`, the time (in months) to wait before deleting dormant projects. Default is `2`.',
      },
      inactive_projects_min_size_mb: {
        type: 'string',
        description:
          'If `delete_inactive_projects` is `true`, the minimum repository size, in MB, for projects to be checked for inactivity. Default is `0`.',
      },
      inactive_projects_send_warning_email_after_months: {
        type: 'string',
        description:
          'If `delete_inactive_projects` is `true`, sets the time (in months) to wait before emailing Maintainers that the project is scheduled to be deleted because it is dormant. Default is `1`.',
      },
      inactive_resource_access_tokens_delete_after_days: {
        type: 'string',
        description: 'Specifies retention period for inactive project and group access tokens. Default is `30`.',
      },
      include_optional_metrics_in_service_ping: {
        type: 'string',
        description: 'If `true`, enables optional metrics in Service Ping.',
      },
      keep_latest_artifact: {
        type: 'string',
        description:
          'If `true`, prevents the deletion of the artifacts from the most recent successful jobs, regardless of the expiry time. Defaults to `true`.',
      },
      kroki_diagram_proxy_enabled: {
        type: 'string',
        description: 'Enable Kroki diagram proxy. Default is `false`.',
      },
      kroki_formats: {
        type: 'string',
        description:
          'Additional formats supported by the Kroki instance. Possible values are `true` or `false` for formats `bpmn`, `blockdiag`, `excalidraw`, and `mermaid` in the format `<format>: true` or `<format>: false`.',
      },
      lock_require_sha_for_merge: {
        type: 'string',
        description:
          'If `true`, enforces the `require_sha_for_merge` setting for all groups on the instance. Introduced in GitLab 19.2.',
      },
      max_http_decompressed_size: {
        type: 'string',
        description:
          'Maximum allowed size in MiB for Gzip-compressed HTTP responses from outbound requests after decompression. Set to `0` for unlimited.',
      },
      max_http_response_csv_structural_chars: {
        type: 'string',
        description:
          'Maximum allowed object count in CSV HTTP responses from outbound requests. Count is an estimate based on the number of `,`, `;`, `\\t`, and `\\n` occurrences in the response. Introduced in GitLab 18.4.',
      },
      max_http_response_json_depth: {
        type: 'string',
        description: 'Maximum allowed nesting depth in JSON HTTP responses from outbound requests.',
      },
      max_http_response_json_structural_chars: {
        type: 'string',
        description:
          'Maximum allowed object count in JSON HTTP responses from outbound requests. Count is an estimate based on the number of `:`, `,`, `{`, and `[` occurrences in the response. Introduced in GitLab 18.4.',
      },
      max_http_response_size_limit: {
        type: 'string',
        description:
          'Maximum allowed size in MiB for HTTP responses from outbound requests. Set to `0` for unlimited. Applicable for integrations, importers, and webhooks. Introduced in GitLab 18.4.',
      },
      max_http_response_xml_structural_chars: {
        type: 'string',
        description:
          'Maximum allowed object count in XML HTTP responses from outbound requests. Count is an estimate based on the number of `<`, and `=` occurrences in the response. Introduced in GitLab 18.4.',
      },
      max_login_attempts: {
        type: 'string',
        description: 'Maximum number of sign-in attempts before locking out the user.',
      },
      max_yaml_depth: {
        type: 'string',
        description: 'Maximum depth of nested CI/CD configuration added with the `include` keyword. Default: `100`.',
      },
      max_yaml_size_bytes: {
        type: 'string',
        description: 'Maximum size in bytes of a single CI/CD configuration file. Default: `2097152`.',
      },
      minimum_password_length: {
        type: 'string',
        description: 'Indicates whether passwords require a minimum length. Premium and Ultimate only.',
      },
      mirror_available: {
        type: 'string',
        description:
          'If `true`, project Maintainers can configure repository mirroring. If `false`, only administrators can configure repository mirroring.',
      },
      notify_on_unknown_sign_in: {
        type: 'string',
        description: 'If `true`, sends a notification when a sign-in from an unknown IP address occurs.',
      },
      offline_transfer_exports_enabled: {
        type: 'string',
        description:
          'If `true`, enables exporting GitLab groups and projects by offline transfer. Introduced in GitLab 19.3.',
      },
      offline_transfer_imports_enabled: {
        type: 'string',
        description:
          'If `true`, enables importing GitLab groups and projects by offline transfer. Introduced in GitLab 19.3.',
      },
      package_registry_allow_anyone_to_pull_option: {
        type: 'string',
        description:
          'If `true`, makes the option to allow anyone to pull from the package registry visible and changeable in project settings.',
      },
      package_registry_cleanup_policies_worker_capacity: {
        type: 'string',
        description: 'Number of workers assigned to the packages cleanup policies.',
      },
      pages_domain_verification_enabled: {
        type: 'string',
        description:
          'If `true`, requires users to prove ownership of custom domains. Domain verification is an essential security measure for public GitLab sites. Users are required to demonstrate they control a domain before it is enabled.',
      },
      pages_unique_domain_default_enabled: {
        type: 'string',
        description:
          'If `true`, enables unique domains by default for Pages sites to avoid cookie sharing between sites under a given namespace. Defaults to `true`.',
      },
      plantuml_diagram_proxy_enabled: {
        type: 'string',
        description: 'Enable PlantUML diagram proxy. Default is `false`.',
      },
      project_hooks_create_limit: {
        type: 'string',
        description:
          'Maximum number of project webhooks a user can create per minute for a given project. Default: `5`. Set to `0` to disable limits. Introduced in GitLab 19.6.',
      },
      projects_api_rate_limit_unauthenticated: {
        type: 'string',
        description:
          'Maximum number of requests per 10 minutes per IP address for unauthenticated requests to the list all projects API. Default: `400`. To disable throttling, set to `0`.',
      },
      protected_ci_variables: {
        type: 'string',
        description: 'If `true`, CI/CD variables are protected by default.',
      },
      rate_limiting_response_text: {
        type: 'string',
        description:
          'When rate limiting is enabled via the `throttle_*` settings, send this plain text response when a rate limit is exceeded. `Retry later` is sent if this is blank.',
      },
      receive_max_input_size: {
        type: 'string',
        description: 'Maximum push size (MB).',
      },
      relation_export_batch_size: {
        type: 'string',
        description: 'Size of each batch when exporting batched relations. Introduced in GitLab 18.2.',
      },
      remember_me_enabled: {
        type: 'string',
        description: 'If `true`, enables the **Remember me** setting.',
      },
      require_admin_two_factor_authentication: {
        type: 'string',
        description: 'Allow administrators to require 2FA for all administrators on the instance.',
      },
      require_email_verification_on_account_locked: {
        type: 'string',
        description:
          'If `true`, all users on the instance must verify their identity after suspicious sign-in activity is detected.',
      },
      require_sha_for_merge: {
        type: 'string',
        description:
          'If `true`, requires a valid commit `sha` for calls to the merge a merge request endpoint. Sets the instance default. Introduced in GitLab 19.2.',
      },
      runner_jobs_endpoints_api_limit: {
        type: 'string',
        description:
          'Maximum number of requests per minute per job token for requests to the `/jobs/*` runner jobs API endpoints. Default: `200`. To disable throttling, set to `0`. Introduced in GitLab 18.5.',
      },
      runner_jobs_patch_trace_api_limit: {
        type: 'string',
        description:
          'Maximum number of requests per minute per runner token for requests to the `PATCH /jobs/:id/trace` runner jobs API endpoint. Default: 2000. To disable throttling, set to 0. Introduced in GitLab 18.5.',
      },
      runner_jobs_request_api_limit: {
        type: 'string',
        description:
          'Maximum number of requests per minute per runner token for requests to the `/jobs/request` runner jobs API endpoint. Default: `2000`. To disable throttling, set to `0`. Introduced in GitLab 18.5.',
      },
      search_rate_limit: {
        type: 'string',
        description:
          'Maximum number of requests per minute for performing a search while authenticated. Default: `30`. To disable throttling, set to `0`.',
      },
      search_rate_limit_unauthenticated: {
        type: 'string',
        description:
          'Maximum number of requests per minute for performing a search while unauthenticated. Default: `10`. To disable throttling, set to `0`.',
      },
      sidekiq_job_limiter_compression_threshold_bytes: {
        type: 'string',
        description:
          'Threshold in bytes at which Sidekiq jobs are compressed before being stored in Redis. Default: 100,000 bytes (100 KB).',
      },
      sidekiq_job_limiter_limit_bytes: {
        type: 'string',
        description:
          "Threshold in bytes at which Sidekiq jobs are rejected. Default: 0 bytes (doesn't reject any job).",
      },
      sidekiq_job_limiter_mode: {
        type: 'string',
        description: "Sets the behavior for Sidekiq job size limits. Default: 'compress'.",
        enum: ['track', 'compress'],
      },
      sidekiq_timezone_override: {
        type: 'string',
        description:
          'IANA timezone identifier (for example, `America/Chicago`) applied to all Sidekiq cron jobs. When blank, no override is applied and cron jobs use the Rails application timezone.',
      },
      sign_in_restrictions: {
        type: 'string',
        description: 'Application sign in restrictions.',
      },
      silent_admin_exports_enabled: {
        type: 'string',
        description: 'If `true`, enables Silent administrator exports. Default is `false`.',
      },
      silent_mode_enabled: {
        type: 'string',
        description: 'If `true`, enables Silent mode. Default is `false`.',
      },
      snippet_size_limit: {
        type: 'string',
        description: 'Maximum snippet content size in bytes. Default: 52428800 bytes (50 MB).',
      },
      snowplow_database_collector_hostname: {
        type: 'string',
        description:
          'The Snowplow collector for database events hostname. (for example, `your-db-snowplow-collector.example.com`)',
      },
      spam_check_api_key: {
        type: 'string',
        description: 'API key used by GitLab for accessing the Spam Check service endpoint.',
      },
      static_objects_external_storage_auth_token: {
        type: 'string',
        description: 'Authentication token for the external storage linked in `static_objects_external_storage_url`.',
      },
      static_objects_external_storage_url: {
        type: 'string',
        description: 'URL to an external storage for repository static objects.',
      },
      terms: {
        type: 'string',
        description: '(**Required by**: `enforce_terms`) Markdown content for the ToS.',
      },
      throttle_authenticated_api_enabled: {
        type: 'string',
        description:
          'If `true`, enables the authenticated API request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). Requires `throttle_authenticated_api_period_in_seconds` and `throttle_authenticated_api_requests_per_period`.',
      },
      throttle_authenticated_api_period_in_seconds: {
        type: 'string',
        description: 'Rate limit period in seconds.',
      },
      throttle_authenticated_api_requests_per_period: {
        type: 'string',
        description: 'Maximum requests per period per user.',
      },
      throttle_authenticated_git_http_enabled: {
        type: 'string',
        description: 'If `true`, enforces the authenticated Git HTTP request rate limit. Default value: `false`.',
      },
      throttle_authenticated_git_http_period_in_seconds: {
        type: 'string',
        description:
          'Rate limit period in seconds. `throttle_authenticated_git_http_enabled` must be `true`. Default value: `3600`.',
      },
      throttle_authenticated_git_http_requests_per_period: {
        type: 'string',
        description:
          'Maximum requests per period per user. `throttle_authenticated_git_http_enabled` must be `true`. Default value: `3600`.',
      },
      throttle_authenticated_mcp_enabled: {
        type: 'string',
        description:
          'If `true`, enforces the rate limit on requests to the MCP Server endpoint, `/api/v4/mcp`, for any HTTP method. Does not apply to other MCP endpoints. Default value: `false`.',
      },
      throttle_authenticated_mcp_period_in_seconds: {
        type: 'string',
        description:
          'Rate limit period in seconds. `throttle_authenticated_mcp_enabled` must be `true`. Default value: `60`.',
      },
      throttle_authenticated_mcp_requests_per_period: {
        type: 'string',
        description:
          'Maximum requests per period per user. `throttle_authenticated_mcp_enabled` must be `true`. Default value: `600`.',
      },
      throttle_authenticated_dependency_proxy_enabled: {
        type: 'string',
        description:
          'If `true`, enforces the authenticated dependency proxy request rate limit. Default value: `false`.',
      },
      throttle_authenticated_dependency_proxy_period_in_seconds: {
        type: 'string',
        description:
          'Rate limit period in seconds. `throttle_authenticated_dependency_proxy_enabled` must be `true`. Default value: `15`.',
      },
      throttle_authenticated_dependency_proxy_requests_per_period: {
        type: 'string',
        description:
          'Maximum requests per period per user. `throttle_authenticated_dependency_proxy_enabled` must be `true`. Default value: `1000`.',
      },
      throttle_authenticated_packages_api_enabled: {
        type: 'string',
        description:
          'If `true`, enables the authenticated package registry API request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). View package registry rate limits for more details. Requires `throttle_authenticated_packages_api_period_in_seconds` and `throttle_authenticated_packages_api_requests_per_period`.',
      },
      throttle_authenticated_packages_api_period_in_seconds: {
        type: 'string',
        description: 'Rate limit period in seconds. View package registry rate limits for more details.',
      },
      throttle_authenticated_packages_api_requests_per_period: {
        type: 'string',
        description: 'Maximum requests per period per user. View package registry rate limits for more details.',
      },
      throttle_authenticated_web_enabled: {
        type: 'string',
        description:
          'If `true`, enables the authenticated web request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). Requires `throttle_authenticated_web_period_in_seconds` and `throttle_authenticated_web_requests_per_period`.',
      },
      throttle_authenticated_web_period_in_seconds: {
        type: 'string',
        description: 'Rate limit period in seconds.',
      },
      throttle_authenticated_web_requests_per_period: {
        type: 'string',
        description: 'Maximum requests per period per user.',
      },
      throttle_unauthenticated_api_enabled: {
        type: 'string',
        description:
          'If `true`, enables the unauthenticated API request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). Requires `throttle_unauthenticated_api_period_in_seconds` and `throttle_unauthenticated_api_requests_per_period`.',
      },
      throttle_unauthenticated_api_period_in_seconds: {
        type: 'string',
        description: 'Rate limit period in seconds.',
      },
      throttle_unauthenticated_api_requests_per_period: {
        type: 'string',
        description: 'Maximum requests per period per IP.',
      },
      throttle_unauthenticated_enabled: {
        type: 'string',
        description:
          'If `true`, enables the unauthenticated web request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). Requires `throttle_unauthenticated_period_in_seconds` and `throttle_unauthenticated_requests_per_period`. Deprecated in GitLab 14.3. Use `throttle_unauthenticated_web_enabled` or `throttle_unauthenticated_api_enabled` instead.',
      },
      throttle_unauthenticated_git_http_enabled: {
        type: 'string',
        description: 'If `true`, enforces the unauthenticated Git HTTP request rate limit. Default value: `false`.',
      },
      throttle_unauthenticated_git_http_period_in_seconds: {
        type: 'string',
        description:
          'Rate limit period in seconds. `throttle_unauthenticated_git_http_enabled` must be `true`. Default value: `3600`.',
      },
      throttle_unauthenticated_git_http_requests_per_period: {
        type: 'string',
        description:
          'Maximum requests per period per IP. `throttle_unauthenticated_git_http_enabled` must be `true`. Default value: `3600`.',
      },
      throttle_unauthenticated_packages_api_enabled: {
        type: 'string',
        description:
          'If `true`, enables the unauthenticated package registry API request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). View package registry rate limits for more details. Requires `throttle_unauthenticated_packages_api_period_in_seconds` and `throttle_unauthenticated_packages_api_requests_per_period`.',
      },
      throttle_unauthenticated_packages_api_period_in_seconds: {
        type: 'string',
        description: 'Rate limit period in seconds. View package registry rate limits for more details.',
      },
      throttle_unauthenticated_packages_api_requests_per_period: {
        type: 'string',
        description: 'Maximum requests per period per IP. View package registry rate limits for more details.',
      },
      throttle_unauthenticated_period_in_seconds: {
        type: 'string',
        description:
          'Rate limit period in seconds. Deprecated in GitLab 14.3. Use `throttle_unauthenticated_web_period_in_seconds` or `throttle_unauthenticated_api_period_in_seconds` instead.',
      },
      throttle_unauthenticated_requests_per_period: {
        type: 'string',
        description:
          'Maximum requests per period per IP. Deprecated in GitLab 14.3. Use `throttle_unauthenticated_web_requests_per_period` or `throttle_unauthenticated_api_requests_per_period` instead.',
      },
      throttle_unauthenticated_web_enabled: {
        type: 'string',
        description:
          'If `true`, enables the unauthenticated web request rate limit. Helps reduce request volume (for example, from crawlers or abusive bots). Requires `throttle_unauthenticated_web_period_in_seconds` and `throttle_unauthenticated_web_requests_per_period`.',
      },
      throttle_unauthenticated_web_period_in_seconds: {
        type: 'string',
        description: 'Rate limit period in seconds.',
      },
      throttle_unauthenticated_web_requests_per_period: {
        type: 'string',
        description: 'Maximum requests per period per IP.',
      },
      time_tracking_limit_to_hours: {
        type: 'string',
        description: 'If `true`, limits display of time tracking units to hours. Default is `false`.',
      },
      top_level_group_creation_enabled: {
        type: 'string',
        description: 'If `true`, users can create top-level groups with the API. Defaults to `true`.',
      },
      unique_ips_limit_enabled: {
        type: 'string',
        description:
          'If `true`, limits sign-ins from multiple IP addresses. Requires `unique_ips_limit_per_user` and `unique_ips_limit_time_window`.',
      },
      unique_ips_limit_per_user: {
        type: 'string',
        description: 'Maximum number of IPs per user.',
      },
      unique_ips_limit_time_window: {
        type: 'string',
        description: 'How many seconds an IP is counted towards the limit.',
      },
      update_runner_versions_enabled: {
        type: 'string',
        description:
          'If `true`, fetches GitLab Runner release version data from GitLab.com. For more information, see how to determine which runners need to be upgraded.',
      },
      use_clickhouse_for_analytics: {
        type: 'string',
        description:
          'If `true`, enables ClickHouse as a data source for analytics reports. ClickHouse must be configured for this setting to take effect. Premium and Ultimate only.',
      },
      user_default_external: {
        type: 'string',
        description: 'If `true`, newly registered users are external by default.',
      },
      user_default_internal_regex: {
        type: 'string',
        description: 'Specify an email address regex pattern to identify default internal users.',
      },
      user_defaults_to_private_profile: {
        type: 'string',
        description: 'If `true`, newly created users have a private profile by default. Defaults to `false`.',
      },
      user_oauth_applications: {
        type: 'string',
        description:
          'If `true`, allows users to register any application to use GitLab as an OAuth provider. This setting does not affect group-level OAuth applications.',
      },
      user_show_add_ssh_key_message: {
        type: 'string',
        description:
          "When set to `false` disable the `You won't be able to pull or push repositories via SSH until you add an SSH key to your profile` warning shown to users with no uploaded SSH key.",
      },
      users_api_limit_followers: {
        type: 'string',
        description:
          'Maximum number of requests per minute, per user or IP address. Default: 100. Set to `0` to disable limits. Introduced in GitLab 17.10.',
      },
      users_api_limit_following: {
        type: 'string',
        description:
          'Maximum number of requests per minute, per user or IP address. Default: 100. Set to `0` to disable limits. Introduced in GitLab 17.10.',
      },
      users_api_limit_gpg_key: {
        type: 'string',
        description:
          'Maximum number of requests per minute, per user or IP address. Default: 120. Set to `0` to disable limits. Introduced in GitLab 17.10.',
      },
      users_api_limit_gpg_keys: {
        type: 'string',
        description:
          'Maximum number of requests per minute, per user or IP address. Default: 120. Set to `0` to disable limits. Introduced in GitLab 17.10.',
      },
      users_api_limit_status: {
        type: 'string',
        description:
          'Maximum number of requests per minute, per user or IP address. Default: 240. Set to `0` to disable limits. Introduced in GitLab 17.10.',
      },
      version_check_enabled: {
        type: 'string',
        description: 'If `true`, GitLab informs you when an update is available.',
      },
      web_hook_event_resend_limit: {
        type: 'string',
        description:
          'Maximum number of webhook event resend requests per minute, per user, for a given project or group. Default: `5`. Set to `0` to disable limits. Introduced in GitLab 19.3.',
      },
      web_hook_test_limit: {
        type: 'string',
        description:
          'Maximum number of webhook test requests per minute, per user, for a given project or group. Default: `5`. Set to `0` to disable limits. Introduced in GitLab 19.3.',
      },
      elasticsearch_aws: {
        type: 'boolean',
        description: 'If `true`, enables the use of AWS hosted Elasticsearch. Premium and Ultimate only.',
      },
      elasticsearch_aws_access_key: {
        type: 'string',
        description: 'AWS IAM access key. Premium and Ultimate only.',
      },
      elasticsearch_aws_region: {
        type: 'string',
        description: 'AWS region where the Elasticsearch domain is configured. Premium and Ultimate only.',
      },
      elasticsearch_aws_secret_access_key: {
        type: 'string',
        description: 'AWS IAM secret access key. Premium and Ultimate only.',
      },
      elasticsearch_indexing: {
        type: 'boolean',
        description: 'If `true`, turns on indexing for advanced search. Premium and Ultimate only.',
      },
      elasticsearch_search: {
        type: 'boolean',
        description: 'If `true`, enables Elasticsearch search. Premium and Ultimate only.',
      },
      elasticsearch_pause_indexing: {
        type: 'boolean',
        description: 'If `true`, pauses Elasticsearch indexing for both Advanced Search and ActiveContext.',
      },
      elasticsearch_advanced_search_pause_indexing: {
        type: 'boolean',
        description: 'If `true`, pauses advanced search indexing.',
      },
      elasticsearch_url: {
        type: 'string',
        description:
          'URL to use for connecting to Elasticsearch. Use a comma-separated list or an array to support clustering (for example, `http://localhost:9200, http://localhost:9201` or `["http://localhost:9200", "http://localhost:9201"]`). Premium and Ultimate only.',
      },
      elasticsearch_username: {
        type: 'string',
        description: 'Username of your Elasticsearch instance. Premium and Ultimate only.',
      },
      elasticsearch_password: {
        type: 'string',
        description: 'Password of your Elasticsearch instance. Premium and Ultimate only.',
      },
      elasticsearch_limit_indexing: {
        type: 'boolean',
        description:
          'If `true`, limits Elasticsearch to index certain namespaces and projects. Premium and Ultimate only.',
      },
      active_context_pause_indexing: {
        type: 'boolean',
        description: 'If `true`, pauses ActiveContext indexing.',
      },
      elasticsearch_namespace_ids: {
        type: 'array',
        description:
          'IDs of namespaces to index with Elasticsearch if `elasticsearch_limit_indexing` is enabled. Premium and Ultimate only.',
        items: {
          type: 'integer',
        },
      },
      elasticsearch_project_ids: {
        type: 'array',
        description:
          'IDs of projects to index with Elasticsearch if `elasticsearch_limit_indexing` is enabled. Premium and Ultimate only.',
        items: {
          type: 'integer',
        },
      },
      secret_detection_token_revocation_enabled: {
        type: 'boolean',
        description: 'If `true`, enables secret detection token revocation.',
      },
      secret_detection_token_revocation_url: {
        type: 'string',
        description: 'URL that GitLab sends leaked tokens to for revocation.',
      },
      secret_detection_revocation_token_types_url: {
        type: 'string',
        description: 'URL that returns the token types that can be revoked.',
      },
      email_additional_text: {
        type: 'string',
        description:
          'Additional text added to the bottom of every email for legal/auditing/compliance reasons. Premium and Ultimate only.',
      },
      default_project_deletion_protection: {
        type: 'boolean',
        description:
          'If `true`, enables default project deletion protection so only administrators can delete projects. GitLab Self-Managed, Premium and Ultimate only.',
      },
      disable_personal_access_tokens: {
        type: 'boolean',
        description:
          "If `true`, disables personal access tokens. GitLab Self-Managed, Premium and Ultimate only. There is no method available to enable a personal access token that's been disabled through the API. This is a known issue. For more information about available workarounds, see Workaround.",
      },
      repository_size_limit: {
        type: 'integer',
        description: 'Size limit per repository (MB). Premium and Ultimate only.',
      },
      file_template_project_id: {
        type: 'integer',
        description: 'ID of the project to load custom file templates from. Premium and Ultimate only.',
      },
      updating_name_disabled_for_users: {
        type: 'boolean',
        description: 'If `true`, prevents users from updating their profile name.',
      },
      disable_overriding_approvers_per_merge_request: {
        type: 'boolean',
        description: 'If `true`, prevents users from overriding approval rules in projects and merge requests.',
      },
      prevent_merge_requests_author_approval: {
        type: 'boolean',
        description: 'If `true`, prevents merge request authors from approving their own merge requests.',
      },
      prevent_merge_requests_committers_approval: {
        type: 'boolean',
        description: 'If `true`, prevents committers from approving merge requests they contributed to.',
      },
      maven_package_requests_forwarding: {
        type: 'boolean',
        description:
          'If `true`, forwards Maven package requests to `repo.maven.apache.org` when not found in the GitLab package registry. Premium and Ultimate only.',
      },
      npm_package_requests_forwarding: {
        type: 'boolean',
        description:
          'If `true`, forwards npm package requests to `npmjs.org` when not found in the GitLab package registry. Premium and Ultimate only.',
      },
      pypi_package_requests_forwarding: {
        type: 'boolean',
        description:
          'If `true`, forwards PyPI package requests to `pypi.org` when not found in the GitLab package registry. Premium and Ultimate only.',
      },
      rubygems_package_requests_forwarding: {
        type: 'boolean',
        description:
          'If `true`, forwards RubyGems package requests to `rubygems.org` when not found in the GitLab package registry. Premium and Ultimate only.',
      },
      virtual_registries_endpoints_api_limit: {
        type: 'integer',
        description:
          'Maximum number of requests on virtual registries endpoints, per IP address, per 15 seconds. Default: 4000. To disable limits, set to `0`. Introduced in GitLab 17.11.',
      },
      audit_events_api_limit: {
        type: 'integer',
        description: 'Maximum number of requests per minute per user to the instance audit events API.',
      },
      project_audit_events_api_limit: {
        type: 'integer',
        description: 'Maximum number of requests per minute per user per project to the project audit events API.',
      },
      group_audit_events_api_limit: {
        type: 'integer',
        description: 'Maximum number of requests per minute per user per group to the group audit events API.',
      },
      group_owners_can_manage_default_branch_protection: {
        type: 'boolean',
        description:
          'If `true`, allows group owners to manage default branch protection in their groups. If `false`, group owners cannot override the instance default branch protection. GitLab Self-Managed, Premium and Ultimate only.',
      },
      maintenance_mode: {
        type: 'boolean',
        description:
          'If `true`, puts the instance into maintenance mode. Non-administrator users can sign in with read-only access and make read-only API requests. Premium and Ultimate only.',
      },
      maintenance_mode_message: {
        type: 'string',
        description: 'Message displayed when instance is in maintenance mode. Premium and Ultimate only.',
      },
      git_two_factor_session_expiry: {
        type: 'integer',
        description:
          'Maximum duration (in minutes) of a session for Git operations when 2FA is enabled. Premium and Ultimate only.',
      },
      max_number_of_repository_downloads: {
        type: 'integer',
        description:
          'Maximum number of unique repositories a user can download in the specified time period before they are banned. Default: 0, Maximum: 10,000 repositories. GitLab Self-Managed, Ultimate only.',
      },
      max_number_of_repository_downloads_within_time_period: {
        type: 'integer',
        description:
          'Reporting time period (in seconds). Default: 0, Maximum: 864000 seconds (10 days). GitLab Self-Managed, Ultimate only.',
      },
      git_rate_limit_users_allowlist: {
        type: 'array',
        description:
          'List of usernames excluded from Git anti-abuse rate limits. Default: `[]`, Maximum: 100 usernames. GitLab Self-Managed, Ultimate only.',
        items: {
          type: 'string',
        },
      },
      git_rate_limit_users_alertlist: {
        type: 'array',
        description:
          'List of user IDs that are emailed when the Git abuse rate limit is exceeded. Default: `[]`, Maximum: 100 user IDs. GitLab Self-Managed, Ultimate only.',
        items: {
          type: 'integer',
        },
      },
      auto_ban_user_on_excessive_projects_download: {
        type: 'boolean',
        description:
          'If `true`, automatically bans users from the application when they download more than the maximum number of unique projects in the time period specified by `max_number_of_repository_downloads` and `max_number_of_repository_downloads_within_time_period`. GitLab Self-Managed, Ultimate only.',
      },
      make_profile_private: {
        type: 'boolean',
        description: 'If `true`, allows users to make their profiles private.',
      },
      service_access_tokens_expiration_enforced: {
        type: 'boolean',
        description: 'If `true`, enforces token expiration for service account users. Premium and Ultimate only.',
      },
      duo_features_enabled: {
        type: 'boolean',
        description:
          'If `true`, enables GitLab Duo features for this instance. GitLab Self-Managed, Premium and Ultimate only.',
      },
      lock_duo_features_enabled: {
        type: 'boolean',
        description:
          'If `true`, enforces the GitLab Duo features enabled setting for all subgroups. GitLab Self-Managed, Premium and Ultimate only.',
      },
      disabled_direct_code_suggestions: {
        type: 'boolean',
        description: 'If `true`, disables direct connections for Code Suggestions for users.',
      },
      receptive_cluster_agents_enabled: {
        type: 'boolean',
        description: 'If `true`, enables receptive mode for GitLab agents for Kubernetes.',
      },
      auto_duo_code_review_enabled: {
        type: 'boolean',
        description: 'If `true`, enables automatic reviews by GitLab Duo on merge requests.',
      },
      duo_code_review_decisions_enabled: {
        type: 'boolean',
        description: 'If `true`, GitLab Duo can approve and request changes on merge requests.',
      },
      security_scan_stale_after_days: {
        type: 'integer',
        description:
          'Number of days to retain security scan data before purging. Must be between 7 and 90 days. Default: 30 days for GitLab.com, 90 days for GitLab Self-Managed. Premium and Ultimate only. Introduced in GitLab 18.9.',
      },
      duo_custom_agents_enabled: {
        type: 'boolean',
        description:
          'If `true`, allows custom agents for this instance. Defaults to `true`. GitLab Self-Managed, Premium and Ultimate only. Introduced in GitLab 19.0.',
      },
      lock_duo_custom_agents_enabled: {
        type: 'boolean',
        description:
          'If `true`, enforces the custom agents enabled setting for all groups. GitLab Self-Managed, Premium and Ultimate only. Introduced in GitLab 19.0.',
      },
      duo_custom_flows_enabled: {
        type: 'boolean',
        description:
          'If `true`, allows custom flows for this instance. Defaults to `true`. GitLab Self-Managed, Premium and Ultimate only. Introduced in GitLab 19.0.',
      },
      lock_duo_custom_flows_enabled: {
        type: 'boolean',
        description:
          'If `true`, enforces the custom flows enabled setting for all groups. GitLab Self-Managed, Premium and Ultimate only. Introduced in GitLab 19.0.',
      },
      duo_external_agents_enabled: {
        type: 'boolean',
        description:
          'If `true`, allows external agents for this instance. Defaults to `true`. GitLab Self-Managed, Premium and Ultimate only. Introduced in GitLab 19.0.',
      },
      lock_duo_external_agents_enabled: {
        type: 'boolean',
        description:
          'If `true`, enforces the external agents enabled setting for all groups. GitLab Self-Managed, Premium and Ultimate only. Introduced in GitLab 19.0.',
      },
      duo_remote_flows_enabled: {
        type: 'boolean',
        description: 'If `true`, enables GitLab Duo remote flows for the instance.',
      },
      lock_duo_remote_flows_enabled: {
        type: 'boolean',
        description: 'If `true`, enforces the GitLab Duo remote flows enabled setting for all subgroups.',
      },
      duo_workflows_default_image_registry: {
        type: 'string',
        description: 'Default container registry for Duo Agent Platform foundational flow images.',
      },
      ci_telemetry_otel_endpoint: {
        type: 'string',
        description: 'OTEL Collector endpoint URL for CI job telemetry.',
      },
      ci_job_telemetry_sampling_rate: {
        type: 'number',
        description: 'Sampling rate for CI job telemetry, ranging from 0.0 to 1.0.',
      },
      duo_namespace_access_rules: {
        type: 'array',
        description: 'Access rules that control which namespaces can access Duo features.',
        items: {
          type: 'object',
          properties: {
            through_namespace: {
              type: 'object',
              description: 'Group whose members can access the listed features.',
            },
            features: {
              type: 'array',
              description: 'List of accessible features.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['features'],
        },
      },
      built_in_project_templates_enabled: {
        type: 'boolean',
        description:
          'If `true`, enables built-in project templates when users create projects. Premium and Ultimate only. Introduced in GitLab 19.0 with a feature flag named `use_built_in_project_templates_enabled`. Generally available in GitLab 19.2. Feature flag `use_built_in_project_templates_enabled` removed.',
      },
      lock_built_in_project_templates_enabled: {
        type: 'boolean',
        description:
          'If `true`, enforces the `built_in_project_templates_enabled` setting for all groups. Premium and Ultimate only. Introduced in GitLab 19.0 with a feature flag named `use_built_in_project_templates_enabled`. Generally available in GitLab 19.2. Feature flag `use_built_in_project_templates_enabled` removed.',
      },
      duo_template_project_id: {
        type: 'integer',
        description: 'ID of the project to use as the Duo Code Review custom instructions template for this instance.',
      },
      use_nats_for_audit_streaming: {
        type: 'boolean',
        description:
          'If `true`, routes audit event streaming through NATS JetStream. NATS must be configured for this setting to take effect. Premium and Ultimate only.',
      },
      allow_all_integrations: {
        type: 'string',
        description:
          'If `true`, allows all integrations on the instance. If `false`, only integrations in `allowed_integrations` are allowed. Ultimate only. Added in GitLab 17.6.',
      },
      allow_group_owners_to_manage_ldap: {
        type: 'string',
        description: 'If `true`, allows group owners to manage LDAP. Premium and Ultimate only.',
      },
      allowed_integrations: {
        type: 'string',
        description:
          'When `allow_all_integrations` is `false`, only integrations in this list are allowed on the instance. Ultimate only. Added in GitLab 17.6.',
      },
      automatic_purchased_storage_allocation: {
        type: 'string',
        description:
          'If `true`, permits automatic allocation of purchased storage in a namespace. Relevant only to EE distributions.',
      },
      check_namespace_plan: {
        type: 'string',
        description:
          "If `true`, makes licensed EE features available to projects only if the project namespace's plan includes the feature or if the project is public. Premium and Ultimate only.",
      },
      delete_unconfirmed_users: {
        type: 'string',
        description:
          'If `true`, deletes users who have not confirmed their email after `unconfirmed_users_delete_after_days` days. Default is `false`. GitLab Self-Managed, Premium and Ultimate only.',
      },
      disable_invite_members: {
        type: 'string',
        description: 'If `true`, disables the invite members functionality for groups.',
      },
      elasticsearch_client_adapter: {
        type: 'string',
        description:
          'Faraday adapter used by the Elasticsearch Ruby Client. Defaults to `typhoeus`. Possible values are `typhoeus` and `net_http`. Introduced in GitLab 18.5. Premium and Ultimate only.',
      },
      elasticsearch_indexed_field_length_limit: {
        type: 'string',
        description:
          'Maximum size of text fields to index by Elasticsearch. A value of `0` means no limit. This does not apply to repository and wiki indexing. Premium and Ultimate only.',
      },
      elasticsearch_indexed_file_size_limit_kb: {
        type: 'string',
        description:
          'Maximum size, in KB, of repository and wiki files that are indexed by Elasticsearch. Premium and Ultimate only.',
      },
      elasticsearch_max_bulk_concurrency: {
        type: 'string',
        description:
          'Maximum concurrency of Elasticsearch bulk requests per indexing operation. This only applies to repository indexing operations. Premium and Ultimate only.',
      },
      elasticsearch_max_bulk_size_mb: {
        type: 'string',
        description:
          'Maximum size of Elasticsearch bulk indexing requests in MB. This only applies to repository indexing operations. Premium and Ultimate only.',
      },
      elasticsearch_max_code_indexing_concurrency: {
        type: 'string',
        description:
          'Maximum concurrency of Elasticsearch code indexing background jobs. This only applies to repository indexing operations. Premium and Ultimate only.',
      },
      elasticsearch_replicas: {
        type: 'string',
        description:
          'Number of replicas for Elasticsearch indices. Use an integer to set all indices to the same value. Use an object to set per-index values. For example: `{"gitlab-production": 1, "gitlab-production-notes": 2}`. When using an object, you must provide both `elasticsearch_shards` and `elasticsearch_replicas` for each index. If either value is missing for an index, that index is skipped. Premium and Ul…',
      },
      elasticsearch_requeue_workers: {
        type: 'string',
        description:
          'If `true`, enables automatic requeuing of indexing workers. This improves non-code indexing throughput by enqueuing Sidekiq jobs until all documents are processed. Premium and Ultimate only.',
      },
      elasticsearch_retry_on_failure: {
        type: 'string',
        description: 'Maximum number of possible retries for Elasticsearch search requests. Premium and Ultimate only.',
      },
      elasticsearch_shards: {
        type: 'string',
        description:
          'Number of shards for Elasticsearch indices. Use an integer to set all indices to the same value. Use an object to set per-index values. For example: `{"gitlab-production": 5, "gitlab-production-notes": 3}`. When using an object, you must provide both `elasticsearch_shards` and `elasticsearch_replicas` for each index. If either value is missing for an index, that index is skipped. Premium and Ulti…',
      },
      elasticsearch_worker_number_of_shards: {
        type: 'string',
        description:
          'Number of indexing worker shards. This improves non-code indexing throughput by enqueuing more parallel Sidekiq jobs. Default is `2`. Premium and Ultimate only.',
      },
      enforce_namespace_storage_limit: {
        type: 'string',
        description: 'If `true`, enforces namespace storage limits.',
      },
      enforce_pipl_compliance: {
        type: 'string',
        description: 'If `true`, enforces PIPL compliance on GitLab.com.',
      },
      geo_node_allowed_ips: {
        type: 'string',
        description:
          'Comma-separated list of IPs and CIDRs of allowed secondary nodes. For example, `1.1.1.1, 2.2.2.0/24`. GitLab Self-Managed, Premium and Ultimate only.',
      },
      geo_status_timeout: {
        type: 'string',
        description:
          'Number of seconds after which a request to get a secondary node status times out. GitLab Self-Managed, Premium and Ultimate only.',
      },
      globally_allowed_ips: {
        type: 'string',
        description:
          'Comma-separated list of IP addresses and CIDRs always allowed for inbound traffic. For example, `1.1.1.1, 2.2.2.0/24`.',
      },
      group_secrets_limit: {
        type: 'string',
        description:
          'Maximum number of secrets allowed per group in Secrets Manager. Default: 500. To disable the limit, set to `0`. Ultimate only. Introduced in GitLab 18.9.',
      },
      lock_memberships_to_saml: {
        type: 'string',
        description: 'If `true`, enforces a global lock on SAML group memberships.',
      },
      max_personal_access_token_lifetime: {
        type: 'string',
        description:
          'Maximum allowable lifetime for access tokens in days. When left blank, default value of 365 is applied. When set, value must be 365 or less. When changed, existing access tokens with an expiration date beyond the maximum allowable lifetime are revoked. GitLab Self-Managed, Ultimate only. In GitLab 17.6 or later, the maximum lifetime limit can be extended to 400 days by enabling a feature flag nam…',
      },
      max_ssh_key_lifetime: {
        type: 'string',
        description:
          'Maximum allowable lifetime for SSH keys in days. GitLab Self-Managed, Ultimate only. In GitLab 17.6 or later, the maximum lifetime limit can be extended to 400 days by enabling a feature flag named `buffered_token_expiration_limit`.',
      },
      mirror_capacity_threshold: {
        type: 'string',
        description:
          'Minimum capacity to be available before scheduling more mirrors preemptively. Premium and Ultimate only.',
      },
      mirror_max_capacity: {
        type: 'string',
        description: 'Maximum number of mirrors that can be synchronizing at the same time. Premium and Ultimate only.',
      },
      mirror_max_delay: {
        type: 'string',
        description:
          'Maximum time (in minutes) between updates that a mirror can have when scheduled to synchronize. Premium and Ultimate only.',
      },
      package_metadata_purl_types: {
        type: 'string',
        description:
          'List of package registry metadata to sync. See the list of the available values. GitLab Self-Managed, Ultimate only.',
      },
      password_lowercase_required: {
        type: 'string',
        description: 'If `true`, passwords require at least one lowercase letter. Premium and Ultimate only.',
      },
      password_number_required: {
        type: 'string',
        description: 'If `true`, passwords require at least one number. Premium and Ultimate only.',
      },
      password_symbol_required: {
        type: 'string',
        description: 'If `true`, passwords require at least one symbol character. Premium and Ultimate only.',
      },
      password_uppercase_required: {
        type: 'string',
        description: 'If `true`, passwords require at least one uppercase letter. Premium and Ultimate only.',
      },
      project_secrets_limit: {
        type: 'string',
        description:
          'Maximum number of secrets allowed per project in Secrets Manager. Default: 100. To disable the limit, set to `0`. Ultimate only. Introduced in GitLab 18.9.',
      },
      scan_execution_policies_action_limit: {
        type: 'string',
        description:
          'Maximum number of `actions` per scan execution policy. Defaults to `0` and cannot be set above `20`.',
      },
      scan_execution_policies_schedule_limit: {
        type: 'string',
        description:
          'Maximum number of `type: schedule` rules per scan execution policy. Defaults to `0` and cannot be set above `20`.',
      },
      secret_push_protection_available: {
        type: 'string',
        description:
          'If `true`, allows projects to enable secret push protection. This does not enable secret push protection. Ultimate only.',
      },
      security_approval_policies_limit: {
        type: 'string',
        description:
          'Maximum number of active merge request approval policies per security policy project. Defaults to `5` and cannot be set above `20`.',
      },
      security_mr_report_cache_lifetime_minutes: {
        type: 'string',
        description:
          'Number of minutes to cache security reports on merge requests (10-60). Default: 10. Premium and Ultimate only. Introduced in GitLab 18.10.',
      },
      shared_runners_minutes: {
        type: 'string',
        description:
          'Set the maximum number of compute minutes that a group can use on instance runners per month. Premium and Ultimate only.',
      },
      unconfirmed_users_delete_after_days: {
        type: 'string',
        description:
          'Specifies how many days after account creation to delete users who have not confirmed their email. Only applicable if `delete_unconfirmed_users` is set to `true`. Must be `1` or greater. Default is `7`. GitLab Self-Managed, Premium and Ultimate only.',
      },
      allow_possible_spam: {
        type: 'string',
      },
      import_jobs_concurrency_limit: {
        type: 'string',
      },
      deny_all_requests_except_allowed: {
        type: 'string',
      },
      block_jwt_for_reclaimed_paths: {
        type: 'string',
      },
      root_moved_permanently_redirection: {
        type: 'string',
      },
      domain_denylist_raw: {
        type: 'string',
      },
      domain_allowlist_raw: {
        type: 'string',
      },
      outbound_local_requests_allowlist_raw: {
        type: 'string',
      },
      enforce_ci_inbound_job_token_scope_enabled: {
        type: 'string',
      },
      enforce_email_subaddress_restrictions: {
        type: 'string',
      },
      error_tracking_enabled: {
        type: 'string',
      },
      error_tracking_api_url: {
        type: 'string',
      },
      force_pages_access_control: {
        type: 'string',
      },
      jira_connect_additional_audience_url: {
        type: 'string',
      },
      math_rendering_limits_enabled: {
        type: 'string',
      },
      max_artifacts_content_include_size: {
        type: 'string',
      },
      organization_cluster_agent_authorization_enabled: {
        type: 'string',
      },
      instance_token_prefix: {
        type: 'string',
      },
      pages_extra_deployments_default_expiry_seconds: {
        type: 'string',
      },
      throttle_authenticated_git_lfs_enabled: {
        type: 'string',
      },
      throttle_authenticated_git_lfs_period_in_seconds: {
        type: 'string',
      },
      throttle_authenticated_git_lfs_requests_per_period: {
        type: 'string',
      },
      throttle_authenticated_files_api_enabled: {
        type: 'string',
      },
      throttle_authenticated_files_api_period_in_seconds: {
        type: 'string',
      },
      throttle_authenticated_files_api_requests_per_period: {
        type: 'string',
      },
      throttle_authenticated_deprecated_api_enabled: {
        type: 'string',
      },
      throttle_authenticated_deprecated_api_period_in_seconds: {
        type: 'string',
      },
      throttle_authenticated_deprecated_api_requests_per_period: {
        type: 'string',
      },
      throttle_unauthenticated_files_api_enabled: {
        type: 'string',
      },
      throttle_unauthenticated_files_api_period_in_seconds: {
        type: 'string',
      },
      throttle_unauthenticated_files_api_requests_per_period: {
        type: 'string',
      },
      throttle_unauthenticated_deprecated_api_enabled: {
        type: 'string',
      },
      throttle_unauthenticated_deprecated_api_period_in_seconds: {
        type: 'string',
      },
      throttle_unauthenticated_deprecated_api_requests_per_period: {
        type: 'string',
      },
      throttle_protected_paths_enabled: {
        type: 'string',
      },
      throttle_protected_paths_period_in_seconds: {
        type: 'string',
      },
      throttle_protected_paths_requests_per_period: {
        type: 'string',
      },
      protected_paths_raw: {
        type: 'string',
      },
      protected_paths_for_get_request_raw: {
        type: 'string',
      },
      usage_ping_generation_enabled: {
        type: 'string',
      },
      usage_ping_features_enabled: {
        type: 'string',
      },
      project_create_limit: {
        type: 'string',
      },
      group_create_limit: {
        type: 'string',
      },
      notes_create_limit: {
        type: 'string',
      },
      notes_create_limit_allowlist_raw: {
        type: 'string',
      },
      members_delete_limit: {
        type: 'string',
      },
      project_import_limit: {
        type: 'string',
      },
      project_export_limit: {
        type: 'string',
      },
      project_download_export_limit: {
        type: 'string',
      },
      group_import_limit: {
        type: 'string',
      },
      group_export_limit: {
        type: 'string',
      },
      group_download_export_limit: {
        type: 'string',
      },
      resource_access_token_notify_inherited: {
        type: 'string',
      },
      lock_resource_access_token_notify_inherited: {
        type: 'string',
      },
      sentry_enabled: {
        type: 'string',
      },
      sentry_dsn: {
        type: 'string',
      },
      sentry_clientside_dsn: {
        type: 'string',
      },
      sentry_environment: {
        type: 'string',
      },
      sentry_clientside_traces_sample_rate: {
        type: 'string',
      },
      search_rate_limit_allowlist_raw: {
        type: 'string',
      },
      users_get_by_id_limit_allowlist_raw: {
        type: 'string',
      },
      invitation_flow_enforcement: {
        type: 'string',
      },
      can_create_organization: {
        type: 'string',
      },
      concurrent_relation_export_limit: {
        type: 'string',
      },
      allow_contribution_mapping_to_admins: {
        type: 'string',
      },
      deactivation_email_additional_text: {
        type: 'string',
      },
      group_api_limit: {
        type: 'string',
      },
      group_archive_unarchive_api_limit: {
        type: 'string',
      },
      group_invited_groups_api_limit: {
        type: 'string',
      },
      group_shared_groups_api_limit: {
        type: 'string',
      },
      group_projects_api_limit: {
        type: 'string',
      },
      groups_api_limit: {
        type: 'string',
      },
      project_api_limit: {
        type: 'string',
      },
      project_invited_groups_api_limit: {
        type: 'string',
      },
      project_repositories_blame_limit: {
        type: 'string',
      },
      project_repositories_blame_unauthenticated_limit: {
        type: 'string',
      },
      project_repositories_blobs_batch_limit: {
        type: 'string',
      },
      projects_api_limit: {
        type: 'string',
      },
      project_members_api_limit: {
        type: 'string',
      },
      create_organization_api_limit: {
        type: 'string',
      },
      user_contributed_projects_api_limit: {
        type: 'string',
      },
      user_projects_api_limit: {
        type: 'string',
      },
      user_starred_projects_api_limit: {
        type: 'string',
      },
      users_api_limit_ssh_keys: {
        type: 'string',
      },
      users_api_limit_ssh_key: {
        type: 'string',
      },
      tags_create_limit: {
        type: 'string',
      },
      observability_backend_ssl_verification_enabled: {
        type: 'string',
      },
      global_search_snippet_titles_enabled: {
        type: 'string',
      },
      global_search_users_enabled: {
        type: 'string',
      },
      global_search_groups_enabled: {
        type: 'string',
      },
      global_search_work_items_enabled: {
        type: 'string',
      },
      global_search_merge_requests_enabled: {
        type: 'string',
      },
      global_search_block_anonymous_searches_enabled: {
        type: 'string',
      },
      vscode_extension_marketplace_enabled: {
        type: 'string',
      },
      vscode_extension_marketplace_extension_host_domain: {
        type: 'string',
      },
      vscode_extension_marketplace_single_origin_fallback_enabled: {
        type: 'string',
      },
      reindexing_minimum_index_size: {
        type: 'string',
      },
      reindexing_minimum_relative_bloat_size: {
        type: 'string',
      },
      anonymous_searches_allowed: {
        type: 'string',
      },
      default_search_scope: {
        type: 'string',
      },
      delay_user_account_self_deletion: {
        type: 'string',
      },
      background_operations_max_jobs: {
        type: 'string',
      },
      pg_ash_sampling_enabled: {
        type: 'string',
      },
      pg_ash_sample_interval_seconds: {
        type: 'string',
      },
      enforce_granular_tokens: {
        type: 'string',
      },
      granular_tokens_enforced_after: {
        type: 'string',
      },
      deactivate_dormant_users: {
        type: 'string',
      },
      deactivate_dormant_users_period: {
        type: 'string',
      },
      nuget_skip_metadata_url_validation: {
        type: 'string',
      },
      helm_max_packages_count: {
        type: 'string',
      },
      mcp_server_enabled: {
        type: 'string',
      },
      dynamic_client_registration_enabled: {
        type: 'string',
      },
      ci_cd_catalog_projects_allowlist: {
        type: 'string',
      },
      ci_cd_catalog_projects_allowlist_raw: {
        type: 'string',
      },
      duo_chat_expiration_column: {
        type: 'string',
      },
      duo_chat_expiration_days: {
        type: 'string',
      },
      elasticsearch_aws_role_arn: {
        type: 'string',
      },
      elasticsearch_client_request_timeout: {
        type: 'string',
      },
      elasticsearch_indexing_timeout_minutes: {
        type: 'string',
      },
      elasticsearch_analyzers_smartcn_enabled: {
        type: 'string',
      },
      elasticsearch_analyzers_smartcn_search: {
        type: 'string',
      },
      elasticsearch_analyzers_kuromoji_enabled: {
        type: 'string',
      },
      elasticsearch_analyzers_kuromoji_search: {
        type: 'string',
      },
      elasticsearch_code_scope: {
        type: 'string',
      },
      instance_level_ai_beta_features_enabled: {
        type: 'string',
      },
      lock_memberships_to_ldap: {
        type: 'string',
      },
      lock_model_prompt_cache_enabled: {
        type: 'string',
      },
      model_prompt_cache_enabled: {
        type: 'string',
      },
      search_max_shard_size_gb: {
        type: 'string',
      },
      search_max_docs_denominator: {
        type: 'string',
      },
      search_min_docs_before_rollover: {
        type: 'string',
      },
      secret_detection_token_revocation_token: {
        type: 'string',
      },
      throttle_incident_management_notification_enabled: {
        type: 'string',
      },
      throttle_incident_management_notification_per_period: {
        type: 'string',
      },
      throttle_incident_management_notification_period_in_seconds: {
        type: 'string',
      },
      product_analytics_enabled: {
        type: 'string',
      },
      product_analytics_data_collector_host: {
        type: 'string',
      },
      product_analytics_configurator_connection_string: {
        type: 'string',
      },
      cube_api_base_url: {
        type: 'string',
      },
      cube_api_key: {
        type: 'string',
      },
      duo_availability: {
        type: 'string',
      },
      duo_agent_platform_enabled: {
        type: 'string',
      },
      duo_cli_enabled: {
        type: 'string',
      },
      ai_audit_events_streaming_enabled: {
        type: 'string',
      },
      duo_token_usage_tracking_enabled: {
        type: 'string',
      },
      duo_remote_flows_availability: {
        type: 'string',
      },
      duo_foundational_flows_enabled: {
        type: 'string',
      },
      duo_foundational_flows_availability: {
        type: 'string',
      },
      duo_custom_agents_availability: {
        type: 'string',
      },
      duo_custom_flows_availability: {
        type: 'string',
      },
      duo_external_agents_availability: {
        type: 'string',
      },
      tool_approval_for_session_enabled: {
        type: 'string',
      },
      tool_approval_for_session_availability: {
        type: 'string',
      },
      duo_auto_mode_enabled: {
        type: 'string',
      },
      duo_auto_mode_availability: {
        type: 'string',
      },
      enabled_expanded_logging: {
        type: 'string',
      },
      foundational_agents_default_enabled: {
        type: 'string',
      },
      foundational_agents_statuses: {
        type: 'string',
      },
      zoekt_indexing_enabled: {
        type: 'string',
      },
      zoekt_search_enabled: {
        type: 'string',
      },
      zoekt_indexing_paused: {
        type: 'string',
      },
      zoekt_auto_index_root_namespace: {
        type: 'string',
      },
      zoekt_cache_response: {
        type: 'string',
      },
      zoekt_cpu_to_tasks_ratio: {
        type: 'string',
      },
      zoekt_force_reindexing_percentage: {
        type: 'string',
      },
      zoekt_indexing_parallelism: {
        type: 'string',
      },
      zoekt_rollout_batch_size: {
        type: 'string',
      },
      zoekt_lost_node_threshold: {
        type: 'string',
      },
      zoekt_indexing_timeout: {
        type: 'string',
      },
      zoekt_maximum_files: {
        type: 'string',
      },
      zoekt_indexed_file_size_limit: {
        type: 'string',
      },
      zoekt_trigram_max: {
        type: 'string',
      },
      zoekt_rollout_retry_interval: {
        type: 'string',
      },
      zoekt_default_number_of_replicas: {
        type: 'string',
      },
      zoekt_max_projects_for_legacy_search: {
        type: 'string',
      },
      zoekt_max_restarts_15m: {
        type: 'string',
      },
      zoekt_initial_indexing_limit: {
        type: 'string',
      },
      orbit_auto_index_root_namespace: {
        type: 'string',
      },
      orbit_dap_enabled_by_default: {
        type: 'string',
      },
      duo_workflow_oauth_application_id: {
        type: 'string',
      },
      pipeline_execution_policies_per_configuration_limit: {
        type: 'string',
      },
      scan_execution_policies_per_configuration_limit: {
        type: 'string',
      },
      vulnerability_management_policies_per_configuration_limit: {
        type: 'string',
      },
      dependency_firewall_policies_per_configuration_limit: {
        type: 'string',
      },
      policy_store_experiment_enabled: {
        type: 'string',
      },
      secret_detection_service_auth_token: {
        type: 'string',
      },
      secret_detection_service_url: {
        type: 'string',
      },
      fetch_observability_alerts_from_cloud: {
        type: 'string',
      },
      global_search_code_enabled: {
        type: 'string',
      },
      global_search_commits_enabled: {
        type: 'string',
      },
      global_search_wiki_enabled: {
        type: 'string',
      },
      global_search_limited_indexing_enabled: {
        type: 'string',
      },
      elastic_migration_worker_enabled: {
        type: 'string',
      },
      display_gitlab_credits_user_data: {
        type: 'string',
      },
      vac_project_ids_raw: {
        type: 'string',
      },
      enable_member_promotion_management: {
        type: 'string',
      },
      allow_deploy_tokens_and_keys_with_external_authn: {
        type: 'string',
      },
      allow_top_level_group_owners_to_create_service_accounts: {
        type: 'string',
      },
      dependency_scanning_sbom_scan_api_upload_limit: {
        type: 'string',
      },
      dependency_scanning_sbom_scan_api_download_limit: {
        type: 'string',
      },
      auto_duo_code_review_on_push_enabled: {
        type: 'string',
      },
    },
  },
  request: {
    method: 'PUT',
    path: '/application/settings',
    body: [
      'admin_mode',
      'admin_notification_email',
      'abuse_notification_email',
      'after_sign_up_text',
      'after_sign_out_path',
      'akismet_enabled',
      'akismet_api_key',
      'asset_proxy_enabled',
      'asset_proxy_url',
      'asset_proxy_secret_key',
      'asset_proxy_whitelist',
      'asset_proxy_allowlist',
      'authn_data_retention_cleanup_enabled',
      'container_registry_token_expire_delay',
      'oauth_access_token_expires_in',
      'decompress_archive_file_timeout',
      'default_artifacts_expire_in',
      'default_ci_config_path',
      'default_project_creation',
      'default_remove_source_branch_after_merge',
      'default_branch_protection',
      'default_branch_protection_defaults',
      'default_group_visibility',
      'default_project_visibility',
      'default_projects_limit',
      'default_snippet_visibility',
      'dependency_management_settings',
      'disable_admin_oauth_scopes',
      'disable_feed_token',
      'disabled_oauth_sign_in_sources',
      'domain_denylist_enabled',
      'domain_denylist',
      'domain_allowlist',
      'outbound_local_requests_whitelist',
      'email_otp_enabled',
      'iframe_rendering_enabled',
      'iframe_rendering_allowlist',
      'iframe_rendering_allowlist_raw',
      'eks_integration_enabled',
      'eks_account_id',
      'eks_access_key_id',
      'eks_secret_access_key',
      'email_author_in_body',
      'email_confirmation_setting',
      'enabled_git_access_protocol',
      'gitpod_enabled',
      'gitpod_url',
      'gitaly_timeout_default',
      'gitaly_timeout_fast',
      'gitaly_timeout_medium',
      'grafana_enabled',
      'grafana_url',
      'gravatar_enabled',
      'help_page_hide_commercial_content',
      'help_page_support_url',
      'help_page_documentation_base_url',
      'help_page_text',
      'home_page_url',
      'housekeeping_enabled',
      'housekeeping_full_repack_period',
      'housekeeping_gc_period',
      'housekeeping_incremental_repack_period',
      'housekeeping_optimize_repository_period',
      'html_emails_enabled',
      'import_sources',
      'invisible_captcha_enabled',
      'max_artifacts_size',
      'max_attachment_size',
      'max_export_size',
      'max_github_response_size_limit',
      'max_github_response_json_value_count',
      'max_import_size',
      'max_import_remote_file_size',
      'max_decompressed_archive_size',
      'max_pages_size',
      'max_pages_custom_domains_per_project',
      'max_terraform_state_size_bytes',
      'metrics_method_call_threshold',
      'password_authentication_enabled',
      'password_authentication_enabled_for_web',
      'signin_enabled',
      'password_authentication_enabled_for_git',
      'performance_bar_allowed_group_id',
      'performance_bar_allowed_group_path',
      'performance_bar_enabled',
      'personal_access_token_prefix',
      'require_personal_access_token_expiry',
      'kroki_enabled',
      'kroki_url',
      'plantuml_enabled',
      'plantuml_url',
      'diagramsnet_enabled',
      'diagramsnet_url',
      'polling_interval_multiplier',
      'project_export_enabled',
      'prometheus_metrics_enabled',
      'push_event_hooks_limit',
      'push_event_activities_limit',
      'recaptcha_enabled',
      'recaptcha_site_key',
      'recaptcha_private_key',
      'login_recaptcha_protection_enabled',
      'repository_checks_enabled',
      'repository_storages_weighted',
      'require_two_factor_authentication',
      'two_factor_grace_period',
      'restricted_visibility_levels',
      'session_expire_delay',
      'session_expire_from_init',
      'shared_runners_enabled',
      'shared_runners_text',
      'valid_runner_registrars',
      'signup_enabled',
      'sourcegraph_enabled',
      'sourcegraph_public_only',
      'sourcegraph_url',
      'spam_check_endpoint_enabled',
      'spam_check_endpoint_url',
      'terminal_max_session_time',
      'usage_ping_enabled',
      'local_markdown_version',
      'allow_local_requests_from_hooks_and_services',
      'mailgun_events_enabled',
      'mailgun_signing_key',
      'snowplow_enabled',
      'snowplow_collector_hostname',
      'snowplow_cookie_domain',
      'snowplow_app_id',
      'issues_create_limit',
      'raw_blob_request_limit',
      'raw_blob_request_limit_unauthenticated',
      'wiki_page_max_content_bytes',
      'description_and_note_max_size',
      'wiki_asciidoc_allow_uri_includes',
      'require_admin_approval_after_user_signup',
      'whats_new_variant',
      'floc_enabled',
      'user_deactivation_emails_enabled',
      'show_migrate_from_jenkins_banner',
      'enable_artifact_external_redirect_warning_page',
      'users_get_by_id_limit',
      'runner_token_expiration_interval',
      'group_runner_token_expiration_interval',
      'project_runner_token_expiration_interval',
      'pipeline_limit_per_project_user_sha',
      'pipeline_limit_per_user',
      'ci_lint_limit_per_user',
      'jira_connect_application_key',
      'jira_connect_public_key_storage_enabled',
      'jira_connect_proxy_url',
      'jira_forge_app_id',
      'bulk_import_concurrent_pipeline_batch_limit',
      'concurrent_relation_batch_export_limit',
      'project_relations_export_limit',
      'project_relations_export_download_limit',
      'group_relations_export_limit',
      'group_relations_export_download_limit',
      'bulk_import_enabled',
      'bulk_import_max_download_file',
      'autocomplete_users_limit',
      'autocomplete_users_unauthenticated_limit',
      'concurrent_github_import_jobs_limit',
      'concurrent_bitbucket_import_jobs_limit',
      'concurrent_bitbucket_server_import_jobs_limit',
      'concurrent_pull_request_import_jobs_limit',
      'allow_runner_registration_token',
      'ci_max_includes',
      'ci_max_caches_per_job',
      'ci_job_live_trace_enabled',
      'ci_job_trace_update_interval',
      'ci_job_trace_update_interval_when_being_watched',
      'git_push_pipeline_limit',
      'security_policy_global_group_approvers_enabled',
      'slack_app_enabled',
      'slack_app_id',
      'slack_app_secret',
      'slack_app_signing_secret',
      'slack_app_verification_token',
      'namespace_aggregation_schedule_lease_duration_in_seconds',
      'project_jobs_api_rate_limit',
      'security_txt_content',
      'downstream_pipeline_trigger_limit_per_project_user_sha',
      'pipeline_cancel_limit_per_user_project',
      'pipeline_retry_limit_per_user_project',
      'job_retry_limit_per_user_project',
      'job_play_limit_per_user_project',
      'pipeline_delete_limit_per_user_project',
      'job_erase_limit_per_user_project',
      'job_cancel_limit_per_user_project',
      'ai_action_api_rate_limit',
      'code_suggestions_api_rate_limit',
      'resource_usage_limits',
      'code_dropdown_custom_clients',
      'vscode_extension_marketplace',
      'enable_language_server_restrictions',
      'minimum_language_server_version',
      'terraform_state_encryption_enabled',
      'logging_field_schema_version',
      'logging_field_dual_emit_target',
      'rsa_key_restriction',
      'dsa_key_restriction',
      'ecdsa_key_restriction',
      'ed25519_key_restriction',
      'ecdsa_sk_key_restriction',
      'ed25519_sk_key_restriction',
      'allow_account_deletion',
      'allow_application_default_credentials_for_offline_transfer',
      'allow_bypass_placeholder_confirmation',
      'allow_local_requests_from_system_hooks',
      'allow_local_requests_from_web_hooks_and_services',
      'allow_project_creation_for_guest_and_below',
      'allow_s3_compatible_storage_for_offline_transfer',
      'archive_builds_in_human_readable',
      'asciidoc_max_includes',
      'authorized_keys_enabled',
      'auto_accept_awarded_achievements',
      'auto_devops_domain',
      'auto_devops_enabled',
      'bulk_import_max_download_file_size',
      'can_create_group',
      'ci_delete_pipelines_in_seconds_limit_human_readable',
      'ci_max_total_yaml_size_bytes',
      'ci_partitions_in_seconds_limit',
      'ci_partitions_in_seconds_limit_human_readable',
      'commit_email_hostname',
      'container_expiration_policies_enable_historic_entries',
      'container_registry_cleanup_tags_service_max_list_size',
      'container_registry_delete_tags_service_timeout',
      'container_registry_expiration_policies_caching',
      'container_registry_expiration_policies_worker_capacity',
      'custom_http_clone_url_root',
      'default_branch_name',
      'default_dark_syntax_highlighting_theme',
      'default_preferred_language',
      'default_syntax_highlighting_theme',
      'delete_inactive_projects',
      'deletion_adjourned_period',
      'diff_max_commits',
      'diff_max_files',
      'diff_max_lines',
      'diff_max_patch_bytes',
      'diff_max_versions',
      'disable_password_authentication_for_users_with_sso_identities',
      'dns_rebinding_protection_enabled',
      'email_restrictions',
      'email_restrictions_enabled',
      'enforce_terms',
      'external_auth_client_cert',
      'external_auth_client_key',
      'external_auth_client_key_pass',
      'external_authorization_service_default_label',
      'external_authorization_service_enabled',
      'external_authorization_service_timeout',
      'external_authorization_service_url',
      'external_pipeline_validation_service_timeout',
      'external_pipeline_validation_service_token',
      'external_pipeline_validation_service_url',
      'failed_login_attempts_unlock_period_in_minutes',
      'first_day_of_week',
      'gitlab_dedicated_instance',
      'gitlab_environment_toolkit_instance',
      'gitlab_product_usage_data_enabled',
      'gitlab_shell_operation_limit',
      'hashed_storage_enabled',
      'hide_third_party_offers',
      'inactive_projects_delete_after_months',
      'inactive_projects_min_size_mb',
      'inactive_projects_send_warning_email_after_months',
      'inactive_resource_access_tokens_delete_after_days',
      'include_optional_metrics_in_service_ping',
      'keep_latest_artifact',
      'kroki_diagram_proxy_enabled',
      'kroki_formats',
      'lock_require_sha_for_merge',
      'max_http_decompressed_size',
      'max_http_response_csv_structural_chars',
      'max_http_response_json_depth',
      'max_http_response_json_structural_chars',
      'max_http_response_size_limit',
      'max_http_response_xml_structural_chars',
      'max_login_attempts',
      'max_yaml_depth',
      'max_yaml_size_bytes',
      'minimum_password_length',
      'mirror_available',
      'notify_on_unknown_sign_in',
      'offline_transfer_exports_enabled',
      'offline_transfer_imports_enabled',
      'package_registry_allow_anyone_to_pull_option',
      'package_registry_cleanup_policies_worker_capacity',
      'pages_domain_verification_enabled',
      'pages_unique_domain_default_enabled',
      'plantuml_diagram_proxy_enabled',
      'project_hooks_create_limit',
      'projects_api_rate_limit_unauthenticated',
      'protected_ci_variables',
      'rate_limiting_response_text',
      'receive_max_input_size',
      'relation_export_batch_size',
      'remember_me_enabled',
      'require_admin_two_factor_authentication',
      'require_email_verification_on_account_locked',
      'require_sha_for_merge',
      'runner_jobs_endpoints_api_limit',
      'runner_jobs_patch_trace_api_limit',
      'runner_jobs_request_api_limit',
      'search_rate_limit',
      'search_rate_limit_unauthenticated',
      'sidekiq_job_limiter_compression_threshold_bytes',
      'sidekiq_job_limiter_limit_bytes',
      'sidekiq_job_limiter_mode',
      'sidekiq_timezone_override',
      'sign_in_restrictions',
      'silent_admin_exports_enabled',
      'silent_mode_enabled',
      'snippet_size_limit',
      'snowplow_database_collector_hostname',
      'spam_check_api_key',
      'static_objects_external_storage_auth_token',
      'static_objects_external_storage_url',
      'terms',
      'throttle_authenticated_api_enabled',
      'throttle_authenticated_api_period_in_seconds',
      'throttle_authenticated_api_requests_per_period',
      'throttle_authenticated_git_http_enabled',
      'throttle_authenticated_git_http_period_in_seconds',
      'throttle_authenticated_git_http_requests_per_period',
      'throttle_authenticated_mcp_enabled',
      'throttle_authenticated_mcp_period_in_seconds',
      'throttle_authenticated_mcp_requests_per_period',
      'throttle_authenticated_dependency_proxy_enabled',
      'throttle_authenticated_dependency_proxy_period_in_seconds',
      'throttle_authenticated_dependency_proxy_requests_per_period',
      'throttle_authenticated_packages_api_enabled',
      'throttle_authenticated_packages_api_period_in_seconds',
      'throttle_authenticated_packages_api_requests_per_period',
      'throttle_authenticated_web_enabled',
      'throttle_authenticated_web_period_in_seconds',
      'throttle_authenticated_web_requests_per_period',
      'throttle_unauthenticated_api_enabled',
      'throttle_unauthenticated_api_period_in_seconds',
      'throttle_unauthenticated_api_requests_per_period',
      'throttle_unauthenticated_enabled',
      'throttle_unauthenticated_git_http_enabled',
      'throttle_unauthenticated_git_http_period_in_seconds',
      'throttle_unauthenticated_git_http_requests_per_period',
      'throttle_unauthenticated_packages_api_enabled',
      'throttle_unauthenticated_packages_api_period_in_seconds',
      'throttle_unauthenticated_packages_api_requests_per_period',
      'throttle_unauthenticated_period_in_seconds',
      'throttle_unauthenticated_requests_per_period',
      'throttle_unauthenticated_web_enabled',
      'throttle_unauthenticated_web_period_in_seconds',
      'throttle_unauthenticated_web_requests_per_period',
      'time_tracking_limit_to_hours',
      'top_level_group_creation_enabled',
      'unique_ips_limit_enabled',
      'unique_ips_limit_per_user',
      'unique_ips_limit_time_window',
      'update_runner_versions_enabled',
      'use_clickhouse_for_analytics',
      'user_default_external',
      'user_default_internal_regex',
      'user_defaults_to_private_profile',
      'user_oauth_applications',
      'user_show_add_ssh_key_message',
      'users_api_limit_followers',
      'users_api_limit_following',
      'users_api_limit_gpg_key',
      'users_api_limit_gpg_keys',
      'users_api_limit_status',
      'version_check_enabled',
      'web_hook_event_resend_limit',
      'web_hook_test_limit',
      'elasticsearch_aws',
      'elasticsearch_aws_access_key',
      'elasticsearch_aws_region',
      'elasticsearch_aws_secret_access_key',
      'elasticsearch_indexing',
      'elasticsearch_search',
      'elasticsearch_pause_indexing',
      'elasticsearch_advanced_search_pause_indexing',
      'elasticsearch_url',
      'elasticsearch_username',
      'elasticsearch_password',
      'elasticsearch_limit_indexing',
      'active_context_pause_indexing',
      'elasticsearch_namespace_ids',
      'elasticsearch_project_ids',
      'secret_detection_token_revocation_enabled',
      'secret_detection_token_revocation_url',
      'secret_detection_revocation_token_types_url',
      'email_additional_text',
      'default_project_deletion_protection',
      'disable_personal_access_tokens',
      'repository_size_limit',
      'file_template_project_id',
      'updating_name_disabled_for_users',
      'disable_overriding_approvers_per_merge_request',
      'prevent_merge_requests_author_approval',
      'prevent_merge_requests_committers_approval',
      'maven_package_requests_forwarding',
      'npm_package_requests_forwarding',
      'pypi_package_requests_forwarding',
      'rubygems_package_requests_forwarding',
      'virtual_registries_endpoints_api_limit',
      'audit_events_api_limit',
      'project_audit_events_api_limit',
      'group_audit_events_api_limit',
      'group_owners_can_manage_default_branch_protection',
      'maintenance_mode',
      'maintenance_mode_message',
      'git_two_factor_session_expiry',
      'max_number_of_repository_downloads',
      'max_number_of_repository_downloads_within_time_period',
      'git_rate_limit_users_allowlist',
      'git_rate_limit_users_alertlist',
      'auto_ban_user_on_excessive_projects_download',
      'make_profile_private',
      'service_access_tokens_expiration_enforced',
      'duo_features_enabled',
      'lock_duo_features_enabled',
      'disabled_direct_code_suggestions',
      'receptive_cluster_agents_enabled',
      'auto_duo_code_review_enabled',
      'duo_code_review_decisions_enabled',
      'security_scan_stale_after_days',
      'duo_custom_agents_enabled',
      'lock_duo_custom_agents_enabled',
      'duo_custom_flows_enabled',
      'lock_duo_custom_flows_enabled',
      'duo_external_agents_enabled',
      'lock_duo_external_agents_enabled',
      'duo_remote_flows_enabled',
      'lock_duo_remote_flows_enabled',
      'duo_workflows_default_image_registry',
      'ci_telemetry_otel_endpoint',
      'ci_job_telemetry_sampling_rate',
      'duo_namespace_access_rules',
      'built_in_project_templates_enabled',
      'lock_built_in_project_templates_enabled',
      'duo_template_project_id',
      'use_nats_for_audit_streaming',
      'allow_all_integrations',
      'allow_group_owners_to_manage_ldap',
      'allowed_integrations',
      'automatic_purchased_storage_allocation',
      'check_namespace_plan',
      'delete_unconfirmed_users',
      'disable_invite_members',
      'elasticsearch_client_adapter',
      'elasticsearch_indexed_field_length_limit',
      'elasticsearch_indexed_file_size_limit_kb',
      'elasticsearch_max_bulk_concurrency',
      'elasticsearch_max_bulk_size_mb',
      'elasticsearch_max_code_indexing_concurrency',
      'elasticsearch_replicas',
      'elasticsearch_requeue_workers',
      'elasticsearch_retry_on_failure',
      'elasticsearch_shards',
      'elasticsearch_worker_number_of_shards',
      'enforce_namespace_storage_limit',
      'enforce_pipl_compliance',
      'geo_node_allowed_ips',
      'geo_status_timeout',
      'globally_allowed_ips',
      'group_secrets_limit',
      'lock_memberships_to_saml',
      'max_personal_access_token_lifetime',
      'max_ssh_key_lifetime',
      'mirror_capacity_threshold',
      'mirror_max_capacity',
      'mirror_max_delay',
      'package_metadata_purl_types',
      'password_lowercase_required',
      'password_number_required',
      'password_symbol_required',
      'password_uppercase_required',
      'project_secrets_limit',
      'scan_execution_policies_action_limit',
      'scan_execution_policies_schedule_limit',
      'secret_push_protection_available',
      'security_approval_policies_limit',
      'security_mr_report_cache_lifetime_minutes',
      'shared_runners_minutes',
      'unconfirmed_users_delete_after_days',
      'allow_possible_spam',
      'import_jobs_concurrency_limit',
      'deny_all_requests_except_allowed',
      'block_jwt_for_reclaimed_paths',
      'root_moved_permanently_redirection',
      'domain_denylist_raw',
      'domain_allowlist_raw',
      'outbound_local_requests_allowlist_raw',
      'enforce_ci_inbound_job_token_scope_enabled',
      'enforce_email_subaddress_restrictions',
      'error_tracking_enabled',
      'error_tracking_api_url',
      'force_pages_access_control',
      'jira_connect_additional_audience_url',
      'math_rendering_limits_enabled',
      'max_artifacts_content_include_size',
      'organization_cluster_agent_authorization_enabled',
      'instance_token_prefix',
      'pages_extra_deployments_default_expiry_seconds',
      'throttle_authenticated_git_lfs_enabled',
      'throttle_authenticated_git_lfs_period_in_seconds',
      'throttle_authenticated_git_lfs_requests_per_period',
      'throttle_authenticated_files_api_enabled',
      'throttle_authenticated_files_api_period_in_seconds',
      'throttle_authenticated_files_api_requests_per_period',
      'throttle_authenticated_deprecated_api_enabled',
      'throttle_authenticated_deprecated_api_period_in_seconds',
      'throttle_authenticated_deprecated_api_requests_per_period',
      'throttle_unauthenticated_files_api_enabled',
      'throttle_unauthenticated_files_api_period_in_seconds',
      'throttle_unauthenticated_files_api_requests_per_period',
      'throttle_unauthenticated_deprecated_api_enabled',
      'throttle_unauthenticated_deprecated_api_period_in_seconds',
      'throttle_unauthenticated_deprecated_api_requests_per_period',
      'throttle_protected_paths_enabled',
      'throttle_protected_paths_period_in_seconds',
      'throttle_protected_paths_requests_per_period',
      'protected_paths_raw',
      'protected_paths_for_get_request_raw',
      'usage_ping_generation_enabled',
      'usage_ping_features_enabled',
      'project_create_limit',
      'group_create_limit',
      'notes_create_limit',
      'notes_create_limit_allowlist_raw',
      'members_delete_limit',
      'project_import_limit',
      'project_export_limit',
      'project_download_export_limit',
      'group_import_limit',
      'group_export_limit',
      'group_download_export_limit',
      'resource_access_token_notify_inherited',
      'lock_resource_access_token_notify_inherited',
      'sentry_enabled',
      'sentry_dsn',
      'sentry_clientside_dsn',
      'sentry_environment',
      'sentry_clientside_traces_sample_rate',
      'search_rate_limit_allowlist_raw',
      'users_get_by_id_limit_allowlist_raw',
      'invitation_flow_enforcement',
      'can_create_organization',
      'concurrent_relation_export_limit',
      'allow_contribution_mapping_to_admins',
      'deactivation_email_additional_text',
      'group_api_limit',
      'group_archive_unarchive_api_limit',
      'group_invited_groups_api_limit',
      'group_shared_groups_api_limit',
      'group_projects_api_limit',
      'groups_api_limit',
      'project_api_limit',
      'project_invited_groups_api_limit',
      'project_repositories_blame_limit',
      'project_repositories_blame_unauthenticated_limit',
      'project_repositories_blobs_batch_limit',
      'projects_api_limit',
      'project_members_api_limit',
      'create_organization_api_limit',
      'user_contributed_projects_api_limit',
      'user_projects_api_limit',
      'user_starred_projects_api_limit',
      'users_api_limit_ssh_keys',
      'users_api_limit_ssh_key',
      'tags_create_limit',
      'observability_backend_ssl_verification_enabled',
      'global_search_snippet_titles_enabled',
      'global_search_users_enabled',
      'global_search_groups_enabled',
      'global_search_work_items_enabled',
      'global_search_merge_requests_enabled',
      'global_search_block_anonymous_searches_enabled',
      'vscode_extension_marketplace_enabled',
      'vscode_extension_marketplace_extension_host_domain',
      'vscode_extension_marketplace_single_origin_fallback_enabled',
      'reindexing_minimum_index_size',
      'reindexing_minimum_relative_bloat_size',
      'anonymous_searches_allowed',
      'default_search_scope',
      'delay_user_account_self_deletion',
      'background_operations_max_jobs',
      'pg_ash_sampling_enabled',
      'pg_ash_sample_interval_seconds',
      'enforce_granular_tokens',
      'granular_tokens_enforced_after',
      'deactivate_dormant_users',
      'deactivate_dormant_users_period',
      'nuget_skip_metadata_url_validation',
      'helm_max_packages_count',
      'mcp_server_enabled',
      'dynamic_client_registration_enabled',
      'ci_cd_catalog_projects_allowlist',
      'ci_cd_catalog_projects_allowlist_raw',
      'duo_chat_expiration_column',
      'duo_chat_expiration_days',
      'elasticsearch_aws_role_arn',
      'elasticsearch_client_request_timeout',
      'elasticsearch_indexing_timeout_minutes',
      'elasticsearch_analyzers_smartcn_enabled',
      'elasticsearch_analyzers_smartcn_search',
      'elasticsearch_analyzers_kuromoji_enabled',
      'elasticsearch_analyzers_kuromoji_search',
      'elasticsearch_code_scope',
      'instance_level_ai_beta_features_enabled',
      'lock_memberships_to_ldap',
      'lock_model_prompt_cache_enabled',
      'model_prompt_cache_enabled',
      'search_max_shard_size_gb',
      'search_max_docs_denominator',
      'search_min_docs_before_rollover',
      'secret_detection_token_revocation_token',
      'throttle_incident_management_notification_enabled',
      'throttle_incident_management_notification_per_period',
      'throttle_incident_management_notification_period_in_seconds',
      'product_analytics_enabled',
      'product_analytics_data_collector_host',
      'product_analytics_configurator_connection_string',
      'cube_api_base_url',
      'cube_api_key',
      'duo_availability',
      'duo_agent_platform_enabled',
      'duo_cli_enabled',
      'ai_audit_events_streaming_enabled',
      'duo_token_usage_tracking_enabled',
      'duo_remote_flows_availability',
      'duo_foundational_flows_enabled',
      'duo_foundational_flows_availability',
      'duo_custom_agents_availability',
      'duo_custom_flows_availability',
      'duo_external_agents_availability',
      'tool_approval_for_session_enabled',
      'tool_approval_for_session_availability',
      'duo_auto_mode_enabled',
      'duo_auto_mode_availability',
      'enabled_expanded_logging',
      'foundational_agents_default_enabled',
      'foundational_agents_statuses',
      'zoekt_indexing_enabled',
      'zoekt_search_enabled',
      'zoekt_indexing_paused',
      'zoekt_auto_index_root_namespace',
      'zoekt_cache_response',
      'zoekt_cpu_to_tasks_ratio',
      'zoekt_force_reindexing_percentage',
      'zoekt_indexing_parallelism',
      'zoekt_rollout_batch_size',
      'zoekt_lost_node_threshold',
      'zoekt_indexing_timeout',
      'zoekt_maximum_files',
      'zoekt_indexed_file_size_limit',
      'zoekt_trigram_max',
      'zoekt_rollout_retry_interval',
      'zoekt_default_number_of_replicas',
      'zoekt_max_projects_for_legacy_search',
      'zoekt_max_restarts_15m',
      'zoekt_initial_indexing_limit',
      'orbit_auto_index_root_namespace',
      'orbit_dap_enabled_by_default',
      'duo_workflow_oauth_application_id',
      'pipeline_execution_policies_per_configuration_limit',
      'scan_execution_policies_per_configuration_limit',
      'vulnerability_management_policies_per_configuration_limit',
      'dependency_firewall_policies_per_configuration_limit',
      'policy_store_experiment_enabled',
      'secret_detection_service_auth_token',
      'secret_detection_service_url',
      'fetch_observability_alerts_from_cloud',
      'global_search_code_enabled',
      'global_search_commits_enabled',
      'global_search_wiki_enabled',
      'global_search_limited_indexing_enabled',
      'elastic_migration_worker_enabled',
      'display_gitlab_credits_user_data',
      'vac_project_ids_raw',
      'enable_member_promotion_management',
      'allow_deploy_tokens_and_keys_with_external_authn',
      'allow_top_level_group_owners_to_create_service_accounts',
      'dependency_scanning_sbom_scan_api_upload_limit',
      'dependency_scanning_sbom_scan_api_download_limit',
      'auto_duo_code_review_on_push_enabled',
    ],
  },
});
