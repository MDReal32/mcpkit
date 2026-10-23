import { defineTool } from "@usemcpkit/core";

export const issuesIssuesAddIssueFieldValues = defineTool({
  name: "issues:issues:add_issue_field_values",
  description:
    "Add issue field values to an issue. Add custom field values to an issue. You can set values for organization-level issue fields that have been defined for the repository's organization. Adding an empty array will clear all existing field values for the issue.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      issue_number: {
        type: "integer",
        description: "The number that identifies the issue.",
      },
      issue_field_values: {
        type: "array",
        description:
          "An array of issue field values to add to this issue. Each field value must include the field ID and the value to set.",
        items: {
          type: "object",
          properties: {
            field_id: {
              type: "integer",
              description: "The ID of the issue field to set",
            },
            value: {
              description:
                "The value to set for the field. The type depends on the field's data type: - For text fields: provide a string value - For single_select fields: provide the option name as a string (must match an existing option) - For number fields: provide a numeric value - For multi_select fields: provide an array of option names (must match existing options) - For date fields: provide an ISO 8601 date string",
            },
          },
          required: ["field_id", "value"],
        },
      },
    },
    required: ["owner", "repo", "issue_number"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values",
    body: ["issue_field_values"],
  },
});
