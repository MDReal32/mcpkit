import { defineTool } from "@usemcpkit/core";

export const orgsOrgsDeleteIssueField = defineTool({
  name: "orgs:orgs:delete_issue_field",
  description: "Delete issue field for an organization. Deletes an issue field for an organization.",
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
    },
    required: ["org", "issue_field_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/issue-fields/{issue_field_id}",
  },
});
