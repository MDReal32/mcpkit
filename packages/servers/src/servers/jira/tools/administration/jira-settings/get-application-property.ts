import { defineTool } from "@usemcpkit/core";

export const administrationJiraSettingsGetApplicationProperty = defineTool({
  name: "administration:jira_settings:get_application_property",
  description: "Get application property. Returns all application properties or an application property.",
  input: {
    type: "object",
    properties: {
      key: {
        type: "string",
        description: "The key of the application property.",
      },
      permissionLevel: {
        type: "string",
        description: "The permission level of all items being returned in the list.",
      },
      keyFilter: {
        type: "string",
        description:
          "When a `key` isn't provided, this filters the list of results by the application property `key` using a regular expression. For example, using `jira.lf.*` will return all application properties with keys that start with *jira.lf.*.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/application-properties",
    query: ["key", "permissionLevel", "keyFilter"],
  },
});
