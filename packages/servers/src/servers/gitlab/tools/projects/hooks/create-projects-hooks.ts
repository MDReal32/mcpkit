import { defineTool } from "@usemcpkit/core";

export const projectsHooksCreateProjectsHooks = defineTool({
  name: "projects:hooks:create_projects_hooks",
  description:
    "Add a webhook to a project. Adds a webhook to a specified project. This endpoint has a rate limit of five requests per minute for each authenticated user for a given project. On GitLab Self-Managed and GitLab Dedicated, an administrator can change this limit in the application settings.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      url: {
        type: "string",
        description: "Webhook URL.",
      },
      name: {
        type: "string",
        description: "Name of the project webhook. Introduced in GitLab 17.1.",
      },
      description: {
        type: "string",
        description: "Description of the project webhook. Introduced in GitLab 17.1.",
      },
      push_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on push events.",
      },
      issues_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on issue events.",
      },
      confidential_issues_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on confidential issue events.",
      },
      merge_requests_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on merge request events.",
      },
      tag_push_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on tag push events.",
      },
      note_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on note events.",
      },
      confidential_note_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on confidential note events.",
      },
      job_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on job events.",
      },
      pipeline_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on pipeline events.",
      },
      wiki_page_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on wiki page events.",
      },
      deployment_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on deployment events.",
      },
      feature_flag_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on feature flag events.",
      },
      releases_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on release events.",
      },
      milestone_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on milestone events.",
      },
      emoji_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on emoji events.",
      },
      resource_access_token_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on project access token expiry events.",
      },
      resource_deploy_token_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on project deploy token expiry events.",
      },
      enable_ssl_verification: {
        type: "boolean",
        description: "If `true`, verifies the SSL certificate when the webhook is triggered.",
      },
      token: {
        type: "string",
        description:
          "Secret token used to validate received payloads. Not returned in the response, and changing the webhook URL resets it.",
      },
      signing_token: {
        type: "string",
        description:
          "HMAC signing token used to compute the `webhook-signature` header. Must be in `whsec_<base64>` format encoding a 32-byte key, and is not returned in the response. Introduced in GitLab 19.0.",
      },
      push_events_branch_filter: {
        type: "string",
        description: "Filter push events by branch name.",
      },
      custom_webhook_template: {
        type: "string",
        description: "Custom template for the webhook request payload.",
      },
      branch_filter_strategy: {
        type: "string",
        description: "Filter push events by branch. Defaults to `wildcard`.",
        enum: ["wildcard", "regex", "all_branches"],
      },
      vulnerability_events: {
        type: "boolean",
        description: "If `true`, triggers the project webhook on vulnerability events.",
      },
      duo_flow_callback_enabled: {
        type: "boolean",
        description:
          "If `true`, allows Duo Agent Platform flows to send lifecycle and progress events to this project webhook. A flow must reference the webhook's ID as `callback_hook_id` when it starts. Introduced in GitLab 19.4 with a feature flag named `duo_flow_callback_hooks`. Disabled by default.",
      },
      url_variables: {
        type: "array",
        description: "URL variables for interpolation.",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Name of the variable.",
            },
            value: {
              type: "string",
              description: "Value of the variable.",
            },
          },
          required: ["key", "value"],
        },
      },
      custom_headers: {
        type: "array",
        description: "Custom headers for the hook.",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "Name of the header.",
            },
            value: {
              type: "string",
              description: "Value of the header.",
            },
          },
          required: ["key", "value"],
        },
      },
    },
    required: ["id", "url"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/hooks",
    body: [
      "url",
      "name",
      "description",
      "push_events",
      "issues_events",
      "confidential_issues_events",
      "merge_requests_events",
      "tag_push_events",
      "note_events",
      "confidential_note_events",
      "job_events",
      "pipeline_events",
      "wiki_page_events",
      "deployment_events",
      "feature_flag_events",
      "releases_events",
      "milestone_events",
      "emoji_events",
      "resource_access_token_events",
      "resource_deploy_token_events",
      "enable_ssl_verification",
      "token",
      "signing_token",
      "push_events_branch_filter",
      "custom_webhook_template",
      "branch_filter_strategy",
      "vulnerability_events",
      "duo_flow_callback_enabled",
      "url_variables",
      "custom_headers",
    ],
  },
});
