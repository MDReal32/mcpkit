import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateGroupsIntegrationsMicrosoftTeams = defineTool({
  name: "projects:integrations:update_groups_integrations_microsoft_teams",
  description: "Create or update the Microsoft Teams integration. Creates or updates the Microsoft Teams integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      webhook: {
        type: "string",
        description: "The Microsoft Teams webhook (for example, `https://outlook.office.com/webhook/...`).",
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
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "webhook"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/integrations/microsoft-teams",
    body: [
      "webhook",
      "notify_only_broken_pipelines",
      "notify_only_when_pipeline_status_changes",
      "branches_to_be_notified",
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
      "use_inherited_settings",
    ],
  },
});
