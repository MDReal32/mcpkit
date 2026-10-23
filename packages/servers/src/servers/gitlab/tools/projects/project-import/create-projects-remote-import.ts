import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportCreateProjectsRemoteImport = defineTool({
  name: "projects:project_import:create_projects_remote_import",
  description: "Import a project from a remote archive. Imports a project from a remote archive.",
  input: {
    type: "object",
    properties: {
      url: {
        type: "string",
        description: "The URL for the file.",
      },
      path: {
        type: "string",
        description: "The new project path and name",
      },
      name: {
        type: "string",
        description: "The name of the project to be imported. Defaults to the path of the project if not provided.",
      },
      namespace: {
        type: "string",
        description:
          "(deprecated) The ID or path of the namespace to import the project to. Defaults to the current user's namespace. Mutually exclusive with `namespace_id`, `namespace_path`.",
      },
      namespace_id: {
        type: "integer",
        description:
          "The ID of the namespace that the project will be imported into. Defaults to the current user's namespace. Mutually exclusive with `namespace`, `namespace_path`.",
      },
      namespace_path: {
        type: "string",
        description:
          "The path of the namespace that the project will be imported into. Defaults to the current user's namespace. Mutually exclusive with `namespace`, `namespace_id`.",
      },
      overwrite: {
        type: "boolean",
        description: "If there is a project in the same namespace and with the same name overwrite it",
        default: false,
      },
      override_params: {
        type: "object",
        description: "New project params to override values in the export",
        properties: {
          description: {
            type: "string",
            description: "The description of the project",
          },
          build_git_strategy: {
            type: "string",
            description: "The Git strategy. Defaults to `fetch`",
            enum: ["fetch", "clone"],
          },
          build_timeout: {
            type: "integer",
            description: "Build timeout",
          },
          auto_cancel_pending_pipelines: {
            type: "string",
            description: "Auto-cancel pending pipelines",
            enum: ["disabled", "enabled"],
          },
          ci_config_path: {
            type: "string",
            description: "The path to CI config file. Defaults to `.gitlab-ci.yml`",
          },
          service_desk_enabled: {
            type: "boolean",
            description: "Disable or enable the service desk",
          },
          issues_enabled: {
            type: "boolean",
            description: "Flag indication if the issue tracker is enabled",
          },
          merge_requests_enabled: {
            type: "boolean",
            description: "Flag indication if merge requests are enabled",
          },
          wiki_enabled: {
            type: "boolean",
            description: "Flag indication if the wiki is enabled",
          },
          jobs_enabled: {
            type: "boolean",
            description: "Flag indication if jobs are enabled",
          },
          snippets_enabled: {
            type: "boolean",
            description: "Flag indication if snippets are enabled",
          },
          issues_access_level: {
            type: "string",
            description: "Issues access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          repository_access_level: {
            type: "string",
            description: "Repository access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          merge_requests_access_level: {
            type: "string",
            description: "Merge requests access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          forking_access_level: {
            type: "string",
            description: "Forks access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          wiki_access_level: {
            type: "string",
            description: "Wiki access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          builds_access_level: {
            type: "string",
            description: "Builds access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          snippets_access_level: {
            type: "string",
            description: "Snippets access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          package_registry_access_level: {
            type: "string",
            description:
              "Controls visibility of the package registry. One of `disabled`, `private`, `enabled` or `public`. `private` will make the package registry accessible only to project members (reporter role and above). `enabled` will make the package registry accessible to everyone who has access to the project. `public` will make the package registry accessible to everyone. `disabled` will disable the package reg…",
            enum: ["disabled", "private", "enabled", "public"],
          },
          pages_access_level: {
            type: "string",
            description: "Pages access level. One of `disabled`, `private`, `enabled` or `public`",
            enum: ["disabled", "private", "enabled", "public"],
          },
          analytics_access_level: {
            type: "string",
            description: "Analytics access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          container_registry_access_level: {
            type: "string",
            description:
              "Controls visibility of the container registry. One of `disabled`, `private` or `enabled`. `private` will make the container registry accessible only to project members (reporter role and above). `enabled` will make the container registry accessible to everyone who has access to the project. `disabled` will disable the container registry",
            enum: ["disabled", "private", "enabled"],
          },
          security_and_compliance_access_level: {
            type: "string",
            description: "Security and compliance access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          releases_access_level: {
            type: "string",
            description: "Releases access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          environments_access_level: {
            type: "string",
            description: "Environments access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          feature_flags_access_level: {
            type: "string",
            description: "Feature flags access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          infrastructure_access_level: {
            type: "string",
            description: "Infrastructure access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          monitor_access_level: {
            type: "string",
            description: "Monitor access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          model_experiments_access_level: {
            type: "string",
            description: "Model experiments access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          model_registry_access_level: {
            type: "string",
            description: "Model registry access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          emails_disabled: {
            type: "boolean",
            description: "Deprecated: Use emails_enabled instead.",
          },
          emails_enabled: {
            type: "boolean",
            description: "Enable email notifications",
          },
          show_default_award_emojis: {
            type: "boolean",
            description: "Show default award emojis",
          },
          show_diff_preview_in_email: {
            type: "boolean",
            description: "Include the code diff preview in merge request notification emails",
          },
          warn_about_potentially_unwanted_characters: {
            type: "boolean",
            description: "Warn about potentially unwanted characters",
          },
          enforce_auth_checks_on_uploads: {
            type: "boolean",
            description: "Enforce auth check on uploads",
          },
          shared_runners_enabled: {
            type: "boolean",
            description: "Flag indication if shared runners are enabled for that project",
          },
          group_runners_enabled: {
            type: "boolean",
            description: "Flag indication if group runners are enabled for that project",
          },
          resource_group_default_process_mode: {
            type: "string",
            description: "The process mode of the resource group",
            enum: ["unordered", "oldest_first", "newest_first", "newest_ready_first"],
          },
          resolve_outdated_diff_discussions: {
            type: "boolean",
            description: "Automatically resolve merge request diff threads on lines changed with a push",
          },
          remove_source_branch_after_merge: {
            type: "boolean",
            description: "Remove the source branch by default after merge",
          },
          packages_enabled: {
            type: "boolean",
            description: "Deprecated: Use :package_registry_access_level instead. Enable project packages feature",
          },
          container_registry_enabled: {
            type: "boolean",
            description:
              "Deprecated: Use :container_registry_access_level instead. Flag indication if the container registry is enabled for that project",
          },
          container_expiration_policy_attributes: {
            type: "object",
            description: "Object that contains information on the container expiration policy",
            properties: {
              cadence: {
                type: "string",
                description: "Container expiration policy cadence for recurring job",
              },
              keep_n: {
                type: "integer",
                description: "Container expiration policy number of images to keep",
              },
              older_than: {
                type: "string",
                description: "Container expiration policy remove images older than value",
              },
              name_regex: {
                type: "string",
                description: "Container expiration policy regex for image removal",
              },
              name_regex_keep: {
                type: "string",
                description: "Container expiration policy regex for image retention",
              },
              enabled: {
                type: "boolean",
                description: "Flag indication if container expiration policy is enabled",
              },
            },
          },
          lfs_enabled: {
            type: "boolean",
            description: "Flag indication if Git LFS is enabled for that project",
          },
          visibility: {
            type: "string",
            description: "The visibility of the project.",
            enum: ["private", "internal", "public"],
          },
          public_builds: {
            type: "boolean",
            description: "Deprecated: Use public_jobs instead.",
          },
          public_jobs: {
            type: "boolean",
            description: "Perform public builds",
          },
          request_access_enabled: {
            type: "boolean",
            description: "Allow users to request member access",
          },
          only_allow_merge_if_pipeline_succeeds: {
            type: "boolean",
            description: "Only allow to merge if builds succeed",
          },
          allow_merge_on_skipped_pipeline: {
            type: "boolean",
            description: "Allow to merge if pipeline is skipped",
          },
          only_allow_merge_if_all_discussions_are_resolved: {
            type: "boolean",
            description: "Only allow to merge if all threads are resolved",
          },
          tag_list: {
            type: "array",
            description: "Deprecated: Use :topics instead",
            items: {
              type: "string",
            },
          },
          topics: {
            type: "array",
            description: "The list of topics for a project",
            items: {
              type: "string",
            },
          },
          avatar: {
            type: "string",
            description: "Avatar image for project",
          },
          printing_merge_request_link_enabled: {
            type: "boolean",
            description: "Show link to create/view merge request when pushing from the command line",
          },
          merge_method: {
            type: "string",
            description: "The merge method used when merging merge requests",
            enum: ["ff", "rebase_merge", "merge"],
          },
          suggestion_commit_message: {
            type: "string",
            description: "The commit message used to apply merge request suggestions",
          },
          merge_commit_template: {
            type: "string",
            description: "Template used to create merge commit message",
          },
          squash_commit_template: {
            type: "string",
            description: "Template used to create squash commit message",
          },
          issue_branch_template: {
            type: "string",
            description: "Template used to create a branch from an issue",
          },
          auto_devops_enabled: {
            type: "boolean",
            description: "Flag indication if Auto DevOps is enabled",
          },
          auto_devops_deploy_strategy: {
            type: "string",
            description: "Auto Deploy strategy",
            enum: ["continuous", "manual", "timed_incremental"],
          },
          autoclose_referenced_issues: {
            type: "boolean",
            description: "Flag indication if referenced issues auto-closing is enabled",
          },
          repository_storage: {
            type: "string",
            description: "Which storage shard the repository is on. Available only to admins",
          },
          squash_option: {
            type: "string",
            description: "Squash default for project. One of `never`, `always`, `default_on`, or `default_off`.",
            enum: ["never", "always", "default_on", "default_off"],
          },
          mr_default_target_self: {
            type: "boolean",
            description: "Merge requests of this forked project targets itself by default",
          },
          mr_default_title_template: {
            type: "string",
            description: "Template used to generate the default merge request title. Maximum 100 characters.",
          },
          cicd_catalog_enabled: {
            type: "boolean",
            description: "Set whether the project is a CI/CD catalog project",
          },
          only_allow_merge_if_all_status_checks_passed: {
            type: "boolean",
            description: "Blocks merge requests from merging unless all status checks have passed",
          },
          approvals_before_merge: {
            type: "integer",
            description: "How many approvers should approve merge request by default",
          },
          mirror: {
            type: "boolean",
            description: "[Deprecated] Enables pull mirroring in a project",
          },
          mirror_trigger_builds: {
            type: "boolean",
            description: "[Deprecated] Pull mirroring triggers builds",
          },
          external_authorization_classification_label: {
            type: "string",
            description: "The classification label for the project",
          },
          requirements_access_level: {
            type: "string",
            description: "Requirements feature access level. One of `disabled`, `private` or `enabled`",
            enum: ["disabled", "private", "enabled"],
          },
          prevent_merge_without_jira_issue: {
            type: "boolean",
            description: "Require an associated issue from Jira",
          },
          auto_duo_code_review_enabled: {
            type: "boolean",
            description: "Enable automatic reviews by GitLab Duo on merge requests",
          },
          duo_code_review_decisions_enabled: {
            type: "boolean",
            description: "Enable approval and change requests by GitLab Duo on merge requests",
          },
          duo_remote_flows_enabled: {
            type: "boolean",
            description: "Enable GitLab Duo remote flows for this project",
          },
          duo_sast_fp_detection_enabled: {
            type: "boolean",
            description: "Enable GitLab Duo SAST false positive detection for this project",
          },
          duo_secret_detection_fp_enabled: {
            type: "boolean",
            description: "Enable GitLab Duo Secret Detection false positive detection for this project",
          },
          duo_dependency_bump_breaking_changes_enabled: {
            type: "boolean",
            description: "Turn on Agentic Breaking Change Resolution for this project",
          },
          duo_sast_vr_workflow_enabled: {
            type: "boolean",
            description: "Enable GitLab Duo SAST vulnerability resolution workflow for this project",
          },
          spp_repository_pipeline_access: {
            type: "boolean",
            description:
              "Grant read-only access to security policy configurations for enforcement in linked CI/CD projects",
          },
          merge_request_title_regex: {
            type: "string",
            description: "The regex the Merge Request must adhere to",
          },
          merge_request_title_regex_description: {
            type: "string",
            description: "The description for the regex the Merge Request must adhere to",
          },
        },
      },
    },
    required: ["url", "path"],
  },
  request: {
    method: "POST",
    path: "/projects/remote-import",
    body: ["url", "path", "name", "namespace", "namespace_id", "namespace_path", "overwrite", "override_params"],
    contentType: "multipart/form-data",
  },
});
