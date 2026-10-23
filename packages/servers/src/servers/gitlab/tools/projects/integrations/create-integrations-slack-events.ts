import { defineTool } from "@usemcpkit/core";

export const projectsIntegrationsCreateIntegrationsSlackEvents = defineTool({
  name: "projects:integrations:create_integrations_slack_events",
  description:
    "Receive Slack events. Receives and processes events sent by the GitLab for Slack app. Requires a valid Slack signature.",
  input: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description: "Request token. Not used by GitLab. Deprecated by Slack.",
      },
      team_id: {
        type: "string",
        description: "ID of the Slack workspace where the event occurred.",
      },
      api_app_id: {
        type: "string",
        description: "ID of the Slack app.",
      },
      event: {
        type: "object",
        description: "Event object with variable properties.",
      },
      type: {
        type: "string",
        description: "Type of the event, usually `event_callback`.",
      },
      event_id: {
        type: "string",
        description: "ID of the event.",
      },
      event_time: {
        type: "integer",
        description: "Unix timestamp, in seconds, of when the event was dispatched.",
      },
      authed_users: {
        type: "array",
        description: "Array of Slack user IDs. Deprecated by Slack.",
        items: {
          type: "string",
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/integrations/slack/events",
    body: ["token", "team_id", "api_app_id", "event", "type", "event_id", "event_time", "authed_users"],
  },
});
