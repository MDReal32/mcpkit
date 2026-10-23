import { defineTool } from "@usemcpkit/core";

export const administrationJiraSettingsGetConfiguration = defineTool({
  name: "administration:jira_settings:get_configuration",
  description:
    "Get global settings. Returns the global settings in Jira. These settings determine whether optional features (for example, subtasks, time tracking, and others) are enabled. If time tracking is enabled, this operation also returns the time tracking configuration.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/configuration",
  },
});
