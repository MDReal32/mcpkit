import { defineTool } from "@usemcpkit/core";

export const appsIssueCustomFieldOptionsAppsReplaceIssueFieldOption = defineTool({
  name: "apps:issue_custom_field_options_apps:replace_issue_field_option",
  description:
    "Replace issue field option. Deselects an issue-field select-list option from all issues where it is selected. A different option can be selected to replace the deselected option. The update can also be limited to a smaller set of issues by using a JQL query.",
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
        description: "The ID of the option to be deselected.",
      },
      replaceWith: {
        type: "integer",
        description: "The ID of the option that will replace the currently selected option.",
      },
      jql: {
        type: "string",
        description: "A JQL query that specifies the issues to be updated. For example, *project=10000*.",
      },
      overrideScreenSecurity: {
        type: "boolean",
        default: false,
        description:
          "Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app users with admin permission.",
      },
      overrideEditableFlag: {
        type: "boolean",
        default: false,
        description:
          "Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge app users with *Administer Jira* global permission.",
      },
    },
    required: ["fieldKey", "optionId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/field/{fieldKey}/option/{optionId}/issue",
    query: ["replaceWith", "jql", "overrideScreenSecurity", "overrideEditableFlag"],
  },
});
