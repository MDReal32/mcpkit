import { defineTool } from "@usemcpkit/core";

export const orgsOrgsUpdateIssueField = defineTool({
  name: "orgs:orgs:update_issue_field",
  description: "Update issue field for an organization. Updates an issue field for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      issue_field_id: {
        type: "integer",
        description: "The unique identifier of the issue field.",
      },
      name: {
        type: "string",
        description: "Name of the issue field.",
      },
      description: {
        type: "string",
        description: "Description of the issue field.",
      },
      visibility: {
        type: "string",
        description:
          "The visibility of the issue field. Can be `organization_members_only` (visible only within the organization) or `all` (visible to all users who can see issues). Only used when the visibility settings feature is enabled.",
        enum: ["organization_members_only", "all"],
      },
      options: {
        type: "array",
        description:
          "Options for select fields. Only applicable when updating single_select or multi_select fields. When provided, this array **replaces** the entire existing set of options rather than adding to or updating individual options. To retain or update an existing option, include it in the array with its `id`. Options sent without an `id` are treated as new options and may cause existing options to be dele…",
        items: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The id of an existing option to retain or update. Omit this when creating a new option.",
            },
            name: {
              type: "string",
              description: "Name of the option.",
            },
            description: {
              type: "string",
              description: "Description of the option.",
            },
            color: {
              type: "string",
              description: "Color for the option.",
              enum: ["gray", "blue", "green", "yellow", "orange", "red", "pink", "purple"],
            },
            priority: {
              type: "integer",
              description: "Priority of the option for ordering.",
            },
          },
          required: ["name", "color", "priority"],
        },
      },
    },
    required: ["org", "issue_field_id"],
  },
  request: {
    method: "PATCH",
    path: "/orgs/{org}/issue-fields/{issue_field_id}",
    body: ["name", "description", "visibility", "options"],
  },
});
