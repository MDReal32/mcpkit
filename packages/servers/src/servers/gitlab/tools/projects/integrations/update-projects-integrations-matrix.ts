import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsMatrix = defineTool({
  name: "projects:integrations:update_projects_integrations_matrix",
  description: "Create or update the Matrix integration. Creates or updates the Matrix integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      hostname: {
        type: "string",
        description:
          "URL of the Matrix server, including `http://` or `https://`. The default value is `https://matrix-client.matrix.org`.",
      },
      token: {
        type: "string",
        description: "The Matrix access token (for example, `syt-zyx57W2v1u123ew11`).",
      },
      room: {
        type: "string",
        description: "Unique identifier for the target room (in the format `!qPKKM111FFKKsfoCVy:matrix.org`).",
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
      incident_events: {
        type: "boolean",
        description: "Trigger event when an incident is created.",
      },
      work_item_events: {
        type: "boolean",
      },
      confidential_work_item_events: {
        type: "boolean",
      },
      vulnerability_events: {
        type: "boolean",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "token", "room"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/matrix",
    body: [
      "hostname",
      "token",
      "room",
      "notify_only_broken_pipelines",
      "notify_only_when_pipeline_status_changes",
      "branches_to_be_notified",
      "push_events",
      "issues_events",
      "confidential_issues_events",
      "merge_requests_events",
      "note_events",
      "confidential_note_events",
      "tag_push_events",
      "pipeline_events",
      "wiki_page_events",
      "incident_events",
      "work_item_events",
      "confidential_work_item_events",
      "vulnerability_events",
      "use_inherited_settings",
    ],
  },
});
