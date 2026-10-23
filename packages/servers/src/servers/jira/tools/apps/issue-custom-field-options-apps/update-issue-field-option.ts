import { defineTool } from "@usemcpkit/core";

export const appsIssueCustomFieldOptionsAppsUpdateIssueFieldOption = defineTool({
  name: "apps:issue_custom_field_options_apps:update_issue_field_option",
  description:
    "Update issue field option. Updates or creates an option for a select list issue field. This operation requires that the option ID is provided when creating an option, therefore, the option ID needs to be specified as a path and body parameter. The option ID provided in the path and body must be identical.",
  input: {
    type: "object",
    properties: {
      fieldKey: {
        type: "string",
        description:
          "The field key is specified in the following format: **$(app-key)\\_\\_$(field-key)**. For example, *example-add-on\\_\\_example-issue-field*. To determine the `fieldKey` value, do one of the following:",
      },
      optionId: {
        type: "integer",
        description: "The ID of the option to be updated.",
      },
      config: {
        type: "object",
        description: "Details of the projects the option is available in.",
        properties: {
          attributes: {
            type: "array",
            description: "DEPRECATED",
            items: {
              type: "string",
              enum: ["notSelectable", "defaultValue"],
            },
          },
          scope: {
            type: "object",
            description:
              "Defines the projects that the option is available in. If the scope is not defined, then the option is available in all projects.",
            properties: {
              global: {
                type: "object",
                description:
                  "Defines the behavior of the option within the global context. If this property is set, even if set to an empty object, then the option is available in all projects.",
              },
              projects: {
                type: "array",
                description: "DEPRECATED",
                items: {
                  type: "integer",
                },
              },
              projects2: {
                type: "array",
                description:
                  "Defines the projects in which the option is available and the behavior of the option within each project. Specify one object per project. The behavior of the option in a project context overrides the behavior in the global context.",
                items: {
                  type: "object",
                },
              },
            },
          },
        },
      },
      id: {
        type: "integer",
        description:
          "The unique identifier for the option. This is only unique within the select field's set of options.",
      },
      properties: {
        type: "object",
        description:
          "The properties of the object, as arbitrary key-value pairs. These properties can be searched using JQL, if the extractions (see Issue Field Option Property Index) are defined in the descriptor for the issue field module.",
      },
      value: {
        type: "string",
        description: "The option's name, which is displayed in Jira.",
      },
    },
    required: ["fieldKey", "optionId", "id", "value"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/field/{fieldKey}/option/{optionId}",
    body: ["config", "id", "properties", "value"],
  },
});
