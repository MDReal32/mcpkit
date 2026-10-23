import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsUpdateProjectsIntegrationsPipelinesEmail = defineTool({
  name: "projects:integrations:update_projects_integrations_pipelines_email",
  description: "Create or update the Pipelines Email integration. Creates or updates the Pipelines Email integration.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      recipients: {
        type: "string",
        description: "Comma-separated list of recipient email addresses.",
      },
      notify_only_broken_pipelines: {
        type: "boolean",
        description: "Send notifications for broken pipelines.",
      },
      notify_only_when_pipeline_status_changes: {
        type: "boolean",
        description: "Send notifications only when the pipeline status changes.",
      },
      notify_only_default_branch: {
        type: "boolean",
        description: "Send notifications for the default branch.",
      },
      branches_to_be_notified: {
        type: "string",
        description:
          "Branches to send notifications for. Valid options are `all`, `default`, `protected`, and `default_and_protected`. The default value is `default`.",
      },
      notify_child_pipelines: {
        type: "boolean",
        description: "Send notifications for child pipelines.",
      },
      pipeline_events: {
        type: "boolean",
        description: "Trigger event when a pipeline status changes.",
      },
      use_inherited_settings: {
        type: "boolean",
        description: "Indicates whether to inherit the default settings. Defaults to `false`.",
      },
    },
    required: ["id", "recipients"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/integrations/pipelines-email",
    body: [
      "recipients",
      "notify_only_broken_pipelines",
      "notify_only_when_pipeline_status_changes",
      "notify_only_default_branch",
      "branches_to_be_notified",
      "notify_child_pipelines",
      "pipeline_events",
      "use_inherited_settings",
    ],
  },
});
