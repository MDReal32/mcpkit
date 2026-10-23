import { defineTool } from "@usemcpkit/core";

export const issuesIssuesCreateIssues = defineTool({
  name: "issues:issues:create_issues",
  description:
    "Bulk create issue. Creates upto **50** issues and, where the option to create subtasks is enabled in Jira, subtasks. Transitions may be applied, to move the issues or subtasks to a workflow step other than the default start step, and issue properties set.",
  input: {
    type: "object",
    properties: {
      issueUpdates: {
        type: "array",
        items: {
          type: "object",
          description: "Details of an issue update request.",
          properties: {
            fields: {
              type: "object",
              description:
                "List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are required, use `update`. Fields included in here cannot be included in `update`.",
            },
            historyMetadata: {
              type: "object",
              description: "Additional issue history details.",
            },
            properties: {
              type: "array",
              description: "Details of issue properties to be add or update.",
              items: {
                type: "object",
                description: "An entity property, for more information see Entity properties.",
              },
            },
            transition: {
              type: "object",
              description:
                "Details of a transition. Required when performing a transition, optional when creating or editing an issue.",
            },
            update: {
              type: "object",
              description:
                "A Map containing the field field name and a list of operations to perform on the issue screen field. Note that fields included in here cannot be included in `fields`.",
            },
          },
        },
      },
    },
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issue/bulk",
    body: ["issueUpdates"],
  },
});
