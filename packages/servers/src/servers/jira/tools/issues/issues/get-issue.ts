import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetIssue = defineTool({
  name: "issues:issues:get_issue",
  description: "Get issue. Returns the details for an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      fields: {
        type: "string",
        description:
          "A list of fields to return for the issue. This parameter accepts a comma-separated list. Use it to retrieve a subset of fields. Allowed values: (comma-separated)",
      },
      fieldsByKeys: {
        type: "boolean",
        default: false,
        description:
          "Whether fields in `fields` are referenced by keys rather than IDs. This parameter is useful where fields have been added by a connect app and a field's key may differ from its ID.",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information about the issues in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
      properties: {
        type: "string",
        description:
          "A list of issue properties to return for the issue. This parameter accepts a comma-separated list. Allowed values: (comma-separated)",
      },
      updateHistory: {
        type: "boolean",
        default: false,
        description:
          "Whether the project in which the issue is created is added to the user's **Recently viewed** project list, as shown under **Projects** in Jira. This also populates the JQL issues search `lastViewed` field.",
      },
      failFast: {
        type: "boolean",
        default: false,
        description:
          "Whether to fail the request quickly in case of an error while loading fields for an issue. For `failFast=true`, if one field fails, the entire operation fails. For `failFast=false`, the operation will continue even if a field fails. It will return a valid response, but without values for the failed field(s).",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}",
    query: ["fields", "fieldsByKeys", "expand", "properties", "updateHistory", "failFast"],
  },
});
