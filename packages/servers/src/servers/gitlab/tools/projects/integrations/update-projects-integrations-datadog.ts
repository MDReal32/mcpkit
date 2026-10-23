import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsDatadog = defineTool({
  name: "projects:integrations:update_projects_integrations_datadog",
  description: "Create or update the Datadog integration. Creates or updates the Datadog integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      datadog_site: {
        type: "string",
        description:
          'Datadog site to send data to. Learn more about Datadog sites in the <a target="_blank" rel="noopener noreferrer" href="https://docs.datadoghq.com/getting_started/site/">documentation</a>.',
      },
      api_url: {
        type: "string",
        description: "Full URL of your Datadog site. Only required if you do not use a standard Datadog site.",
      },
      api_key: {
        type: "string",
        description:
          '<a target="_blank" rel="noopener noreferrer" href="https://docs.datadoghq.com/account_management/api-app-keys/">API key</a> used for authentication with Datadog.',
      },
      datadog_ci_visibility: {
        type: "boolean",
        description: "Enable CI Visibility",
      },
      archive_trace_events: {
        type: "boolean",
        description:
          "When enabled, job logs are collected by Datadog and displayed along with pipeline execution traces.",
      },
      datadog_service: {
        type: "string",
        description:
          "Tag all pipeline data from this GitLab instance in Datadog. Can be used when managing several self-managed deployments.",
      },
      datadog_env: {
        type: "string",
        description: "For self-managed deployments, `env` tag for all the data sent to Datadog.",
      },
      datadog_tags: {
        type: "string",
        description: "Custom tags in Datadog. Specify one tag per line in the format `key:value\\nkey2:value2`.",
      },
      pipeline_events: {
        type: "boolean",
        description: "Trigger event when a pipeline status changes.",
      },
      build_events: {
        type: "boolean",
        description: "Trigger event when a build is created.",
      },
      push_events: {
        type: "boolean",
        description: "Trigger event for pushes to the repository.",
      },
      merge_requests_events: {
        type: "boolean",
        description: "Trigger event when a merge request is created, updated, or merged.",
      },
      note_events: {
        type: "boolean",
        description: "Trigger event for new comments.",
      },
      tag_push_events: {
        type: "boolean",
        description: "Trigger event for new tags pushed to the repository.",
      },
      subgroup_events: {
        type: "boolean",
      },
      project_events: {
        type: "boolean",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "api_key"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/datadog",
    body: [
      "datadog_site",
      "api_url",
      "api_key",
      "datadog_ci_visibility",
      "archive_trace_events",
      "datadog_service",
      "datadog_env",
      "datadog_tags",
      "pipeline_events",
      "build_events",
      "push_events",
      "merge_requests_events",
      "note_events",
      "tag_push_events",
      "subgroup_events",
      "project_events",
      "use_inherited_settings",
    ],
  },
});
