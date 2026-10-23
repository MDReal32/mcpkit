import { defineTool } from "@usemcpkit/core";

export const groupsPlanLimitsUpdateApplicationPlanLimits = defineTool({
  name: "groups:plan_limits:update_application_plan_limits",
  description: "Change plan limits. Modify the limits of a plan on the GitLab instance.",
  input: {
    type: "object",
    properties: {
      plan_name: {
        type: "string",
        description: "Name of the plan to update.",
        enum: [
          "default",
          "free",
          "bronze",
          "silver",
          "premium",
          "gold",
          "ultimate",
          "ultimate_trial",
          "ultimate_trial_paid_customer",
          "premium_trial",
          "opensource",
        ],
      },
      cargo_max_file_size: {
        type: "integer",
        description: "Maximum Cargo package file size in bytes. Introduced in GitLab 19.3.",
      },
      ci_instance_level_variables: {
        type: "integer",
        description: "Maximum number of instance-level CI/CD variables that can be defined.",
      },
      ci_pipeline_size: {
        type: "integer",
        description: "Maximum number of jobs in a single pipeline.",
      },
      ci_active_jobs: {
        type: "integer",
        description: "Total number of jobs in currently active pipelines.",
      },
      ci_project_subscriptions: {
        type: "integer",
        description: "Maximum number of pipeline subscriptions to and from a project.",
      },
      ci_pipeline_schedules: {
        type: "integer",
        description: "Maximum number of pipeline schedules.",
      },
      ci_needs_size_limit: {
        type: "integer",
        description: "Maximum number of `needs` dependencies that a job can have.",
      },
      ci_registered_group_runners: {
        type: "integer",
        description: "Maximum number of runners created or active in a group during the past seven days.",
      },
      ci_registered_project_runners: {
        type: "integer",
        description: "Maximum number of runners created or active in a project during the past seven days.",
      },
      conan_max_file_size: {
        type: "integer",
        description: "Maximum Conan package file size in bytes.",
      },
      dotenv_size: {
        type: "integer",
        description: "Maximum size of a dotenv artifact in bytes. Introduced in GitLab 17.1.",
      },
      dotenv_variables: {
        type: "integer",
        description: "Maximum number of variables in a dotenv artifact. Introduced in GitLab 17.1.",
      },
      enforcement_limit: {
        type: "integer",
        description: "Maximum storage size for root namespace limit enforcement, in MiB.",
      },
      generic_packages_max_file_size: {
        type: "integer",
        description: "Maximum generic package file size in bytes.",
      },
      helm_max_file_size: {
        type: "integer",
        description: "Maximum Helm chart file size in bytes.",
      },
      maven_max_file_size: {
        type: "integer",
        description: "Maximum Maven package file size in bytes.",
      },
      notification_limit: {
        type: "integer",
        description: "Maximum storage size for root namespace limit notifications, in MiB.",
      },
      npm_max_file_size: {
        type: "integer",
        description: "Maximum npm package file size in bytes.",
      },
      nuget_max_file_size: {
        type: "integer",
        description: "Maximum NuGet package file size in bytes.",
      },
      pypi_max_file_size: {
        type: "integer",
        description: "Maximum PyPI package file size in bytes.",
      },
      service_desk_outbound_emails_per_hour: {
        type: "integer",
        description:
          "Maximum number of outbound Service Desk emails per hour, per top-level namespace. Set to `0` for unlimited. Introduced in GitLab 19.4.",
      },
      service_desk_outbound_emails_per_day: {
        type: "integer",
        description:
          "Maximum number of outbound Service Desk emails per day, per top-level namespace. Set to `0` for unlimited. Introduced in GitLab 19.4.",
      },
      terraform_module_max_file_size: {
        type: "integer",
        description: "Maximum Terraform module package file size in bytes.",
      },
      storage_size_limit: {
        type: "integer",
        description: "Maximum storage size for the root namespace, in MiB.",
      },
      pipeline_hierarchy_size: {
        type: "integer",
        description:
          "Maximum number of downstream pipelines in a pipeline's hierarchy tree. The default is `1000`. Higher values are not recommended.",
      },
      web_hook_calls: {
        type: "integer",
        description:
          "Maximum number of times a webhook can be called per minute, per top-level namespace. Set to `0` for unlimited. Introduced in GitLab 18.5.",
      },
      web_hook_calls_low: {
        type: "integer",
        description:
          "Maximum number of times a webhook can be called per minute, per top-level namespace. Set to `0` for unlimited. GitLab.com only.",
      },
      web_hook_calls_mid: {
        type: "integer",
        description:
          "Maximum number of times a webhook can be called per minute, per top-level namespace. Set to `0` for unlimited. GitLab.com only.",
      },
      max_pipelines_per_merge_train: {
        type: "integer",
        description:
          "Maximum number of parallel pipelines per merge train. The default is `20` and the minimum is `1`. Introduced in GitLab 19.0.",
      },
    },
    required: ["plan_name"],
  },
  request: {
    method: "PUT",
    path: "/application/plan_limits",
    body: [
      "plan_name",
      "cargo_max_file_size",
      "ci_instance_level_variables",
      "ci_pipeline_size",
      "ci_active_jobs",
      "ci_project_subscriptions",
      "ci_pipeline_schedules",
      "ci_needs_size_limit",
      "ci_registered_group_runners",
      "ci_registered_project_runners",
      "conan_max_file_size",
      "dotenv_size",
      "dotenv_variables",
      "enforcement_limit",
      "generic_packages_max_file_size",
      "helm_max_file_size",
      "maven_max_file_size",
      "notification_limit",
      "npm_max_file_size",
      "nuget_max_file_size",
      "pypi_max_file_size",
      "service_desk_outbound_emails_per_hour",
      "service_desk_outbound_emails_per_day",
      "terraform_module_max_file_size",
      "storage_size_limit",
      "pipeline_hierarchy_size",
      "web_hook_calls",
      "web_hook_calls_low",
      "web_hook_calls_mid",
      "max_pipelines_per_merge_train",
    ],
  },
});
