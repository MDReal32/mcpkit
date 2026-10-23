import { defineTool } from "@usemcpkit/core";

export const administrationJiraSettingsSetApplicationProperty = defineTool({
  name: "administration:jira_settings:set_application_property",
  description:
    "Set application property. Changes the value of an application property. For example, you can change the value of the `jira.clone.prefix` from its default value of *CLONE -* to *Clone -* if you prefer sentence case capitalization. Editable properties are described below along with their default values.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The key of the application property to update.",
      },
      body_id: {
        type: "string",
        description: "The ID of the application property.",
      },
      value: {
        type: "string",
        description: "The new value.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/application-properties/{id}",
    body: {
      id: "body_id",
      value: "value",
    },
  },
});
