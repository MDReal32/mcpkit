import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsDiscord = defineTool({
  name: "projects:integrations:update_projects_integrations_discord",
  description: "Create or update the Discord integration. Creates or updates the Discord integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      webhook: {
        type: "string",
        description: "Discord webhook (for example, `https://discord.com/api/webhooks/…`).",
      },
      notify_only_broken_pipelines: {
        type: "boolean",
        description: "Send notifications for broken pipelines.",
      },
      notify_only_when_pipeline_status_changes: {
        type: "boolean",
        description: "Send notifications only when the pipeline status changes.",
      },
      branches_to_be_notified: {
        type: "string",
        description:
          "Branches to send notifications for. Valid options are `all`, `default`, `protected`, and `default_and_protected`. The default value is `default`.",
      },
      push_channel: {
        type: "string",
        description: "The name of the channel to receive push_events notifications",
      },
      issue_channel: {
        type: "string",
        description: "The name of the channel to receive issues_events notifications",
      },
      incident_channel: {
        type: "string",
        description: "The name of the channel to receive incident_events notifications",
      },
      alert_channel: {
        type: "string",
        description: "The name of the channel to receive alert_events notifications",
      },
      confidential_issue_channel: {
        type: "string",
        description: "The name of the channel to receive confidential_issues_events notifications",
      },
      merge_request_channel: {
        type: "string",
        description: "The name of the channel to receive merge_requests_events notifications",
      },
      note_channel: {
        type: "string",
        description: "The name of the channel to receive note_events notifications",
      },
      confidential_note_channel: {
        type: "string",
        description: "The name of the channel to receive confidential_note_events notifications",
      },
      tag_push_channel: {
        type: "string",
        description: "The name of the channel to receive tag_push_events notifications",
      },
      deployment_channel: {
        type: "string",
        description: "The name of the channel to receive deployment_events notifications",
      },
      pipeline_channel: {
        type: "string",
        description: "The name of the channel to receive pipeline_events notifications",
      },
      wiki_page_channel: {
        type: "string",
        description: "The name of the channel to receive wiki_page_events notifications",
      },
      vulnerability_channel: {
        type: "string",
        description: "The name of the channel to receive vulnerability_events notifications",
      },
      push_events: {
        type: "boolean",
        description: "Trigger event for pushes to the repository.",
      },
      issues_events: {
        type: "boolean",
        description: "Trigger event when a work item is created, updated, or closed.",
      },
      confidential_issues_events: {
        type: "boolean",
        description: "Trigger event when a confidential work item is created, updated, or closed.",
      },
      work_item_events: {
        type: "boolean",
      },
      confidential_work_item_events: {
        type: "boolean",
      },
      merge_requests_events: {
        type: "boolean",
        description: "Trigger event when a merge request is created, updated, or merged.",
      },
      note_events: {
        type: "boolean",
        description: "Trigger event for new comments.",
      },
      confidential_note_events: {
        type: "boolean",
        description: "Trigger event for new comments on confidential work items.",
      },
      tag_push_events: {
        type: "boolean",
        description: "Trigger event for new tags pushed to the repository.",
      },
      pipeline_events: {
        type: "boolean",
        description: "Trigger event when a pipeline status changes.",
      },
      wiki_page_events: {
        type: "boolean",
        description: "Trigger event when a wiki page is created or updated.",
      },
      deployment_events: {
        type: "boolean",
        description: "Trigger event when a deployment starts or finishes.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "webhook"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/discord",
    body: [
      "webhook",
      "notify_only_broken_pipelines",
      "notify_only_when_pipeline_status_changes",
      "branches_to_be_notified",
      "push_channel",
      "issue_channel",
      "incident_channel",
      "alert_channel",
      "confidential_issue_channel",
      "merge_request_channel",
      "note_channel",
      "confidential_note_channel",
      "tag_push_channel",
      "deployment_channel",
      "pipeline_channel",
      "wiki_page_channel",
      "vulnerability_channel",
      "push_events",
      "issues_events",
      "confidential_issues_events",
      "work_item_events",
      "confidential_work_item_events",
      "merge_requests_events",
      "note_events",
      "confidential_note_events",
      "tag_push_events",
      "pipeline_events",
      "wiki_page_events",
      "deployment_events",
      "use_inherited_settings",
    ],
  },
});
