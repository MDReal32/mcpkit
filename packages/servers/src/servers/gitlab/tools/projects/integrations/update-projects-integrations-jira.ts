import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsJira = defineTool({
  name: "projects:integrations:update_projects_integrations_jira",
  description: "Create or update the Jira integration. Creates or updates the Jira integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      url: {
        type: "string",
        description:
          "The URL to the Jira project which is being linked to this GitLab project (for example, `https://jira.example.com`).",
      },
      api_url: {
        type: "string",
        description:
          "The base URL to the Jira instance API. Web URL value is used if not set (for example, `https://jira-api.example.com`).",
      },
      jira_auth_type: {
        type: "integer",
        description:
          "The authentication method to use with Jira. Use `0` for basic authentication, `1` for Jira personal access token, and `2` for Jira Cloud service accounts. Defaults to `0`.",
      },
      username: {
        type: "string",
        description:
          "The email or username to use with Jira. Use an email for Jira Cloud, and a username for Jira Data Center and Jira Server. Required when using basic authentication (`jira_auth_type` is `0`).",
      },
      password: {
        type: "string",
        description:
          "The Jira API token, password, or personal access token to use with Jira. When using Basic Authentication (`jira_auth_type` is `0`), use an API token for Jira Cloud, and a password for Jira Data Center or Jira Server. For a Jira personal access token (`jira_auth_type` is `1`), use the personal access token.",
      },
      jira_issue_regex: {
        type: "string",
        description: "Regular expression to match Jira issue keys.",
      },
      jira_issue_prefix: {
        type: "string",
        description: "Prefix to match Jira issue keys.",
      },
      jira_issue_transition_id: {
        type: "string",
        description:
          "The ID of one or more transitions for custom issue transitions.Ignored when `jira_issue_transition_automatic` is enabled. Defaults to a blank string,which disables custom transitions.",
      },
      issues_enabled: {
        type: "string",
        description: "Enable viewing Jira issues in GitLab.",
      },
      project_keys: {
        type: "array",
        description:
          "Keys of Jira projects to display. When `issues_enabled` is `true`, this setting filters which Jira projects are shown in GitLab. It does not restrict the API token's access.",
        items: {
          type: "string",
        },
      },
      vulnerabilities_enabled: {
        type: "boolean",
        description: "Turn on Jira issue creation for GitLab vulnerabilities.",
      },
      vulnerabilities_issuetype: {
        type: "string",
        description: "Jira issue type to use when creating issues from vulnerabilities.",
      },
      project_key: {
        type: "string",
        description:
          "Key of the project to use when creating issues from vulnerabilities.This parameter is required if using the integration to create Jira issues from vulnerabilities.",
      },
      customize_jira_issue_enabled: {
        type: "boolean",
        description:
          "When set to `true`, opens a prefilled form on the Jira instancewhen creating a Jira issue from a vulnerability.",
      },
      jira_check_enabled: {
        type: "boolean",
        description: "Verify Jira issues referenced in commit messages exist before allowing the push.",
      },
      jira_exists_check_enabled: {
        type: "boolean",
        description: "Verify the Jira issues referenced in commit messages exist in Jira.",
      },
      jira_assignee_check_enabled: {
        type: "boolean",
        description: "Verify the committer is the assignee of the Jira issues referenced in commit messages.",
      },
      jira_status_check_enabled: {
        type: "boolean",
        description: "Verify the status of Jira issues referenced in commit messages.",
      },
      jira_allowed_statuses_as_string: {
        type: "string",
        description: "Comma-separated list of allowed Jira issue statuses.",
      },
      comment_on_event_enabled: {
        type: "boolean",
        description: "Enable comments inside Jira issues on each GitLab event (commit / merge request)",
      },
      commit_events: {
        type: "boolean",
        description: "Trigger event when a commit is created or updated.",
      },
      merge_requests_events: {
        type: "boolean",
        description: "Trigger event when a merge request is created, updated, or merged.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "url", "password"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/jira",
    body: [
      "url",
      "api_url",
      "jira_auth_type",
      "username",
      "password",
      "jira_issue_regex",
      "jira_issue_prefix",
      "jira_issue_transition_id",
      "issues_enabled",
      "project_keys",
      "vulnerabilities_enabled",
      "vulnerabilities_issuetype",
      "project_key",
      "customize_jira_issue_enabled",
      "jira_check_enabled",
      "jira_exists_check_enabled",
      "jira_assignee_check_enabled",
      "jira_status_check_enabled",
      "jira_allowed_statuses_as_string",
      "comment_on_event_enabled",
      "commit_events",
      "merge_requests_events",
      "use_inherited_settings",
    ],
  },
});
