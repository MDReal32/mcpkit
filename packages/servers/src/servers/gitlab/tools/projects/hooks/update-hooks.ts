import { defineTool } from "@usemcpkit/core";

export const projectsHooksUpdateHooks = defineTool({
  name: "projects:hooks:update_hooks",
  description: "Update a system hook. Updates a specified system hook.",
  input: {
    type: "object",
    properties: {
      hook_id: {
        type: "integer",
        description: "ID of the system hook.",
      },
      url: {
        type: "string",
        description: "Webhook URL.",
      },
      name: {
        type: "string",
        description: "Name of the hook. Introduced in GitLab 17.1.",
      },
      description: {
        type: "string",
        description: "Description of the hook. Introduced in GitLab 17.1.",
      },
      token: {
        type: "string",
        description:
          "Secret token used to validate received payloads. Not returned in the response, and changing the hook URL resets it.",
      },
      signing_token: {
        type: "string",
        description:
          "HMAC signing token used to compute the `webhook-signature` header. Must be in `whsec_<base64>` format encoding a 32-byte key, and is not returned in the response. Introduced in GitLab 19.0.",
      },
      push_events: {
        type: "boolean",
        description: "If `true`, triggers the system hook on push events.",
      },
      tag_push_events: {
        type: "boolean",
        description: "If `true`, triggers the system hook on tag push events.",
      },
      merge_requests_events: {
        type: "boolean",
        description: "If `true`, triggers the system hook on merge request events.",
      },
      repository_update_events: {
        type: "boolean",
        description: "If `true`, triggers the system hook on repository update events.",
      },
      enable_ssl_verification: {
        type: "boolean",
        description: "If `true`, verifies the SSL certificate when the hook is triggered.",
      },
      push_events_branch_filter: {
        type: "string",
        description: "Filter push events by branch name.",
      },
      branch_filter_strategy: {
        type: "string",
        description: "Filter push events by branch. Defaults to `wildcard`.",
        enum: ["wildcard", "regex", "all_branches"],
      },
      custom_webhook_template: {
        type: "string",
        description: "Custom template for the system hook request payload.",
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
    required: ["hook_id"],
  },
  request: {
    method: "PUT",
    path: "/hooks/{hook_id}",
    body: [
      "url",
      "name",
      "description",
      "token",
      "signing_token",
      "push_events",
      "tag_push_events",
      "merge_requests_events",
      "repository_update_events",
      "enable_ssl_verification",
      "push_events_branch_filter",
      "branch_filter_strategy",
      "custom_webhook_template",
      "url_variables",
      "custom_headers",
    ],
  },
});
