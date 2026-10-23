import { defineTool } from "@usemcpkit/core";

export const orgsOrgsDeleteIssueType = defineTool({
  name: "orgs:orgs:delete_issue_type",
  description: "Delete issue type for an organization. Deletes an issue type for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      issue_type_id: {
        type: "integer",
        description: "The unique identifier of the issue type.",
      },
    },
    required: ["org", "issue_type_id"],
  },
  request: {
    method: "DELETE",
    path: "/orgs/{org}/issue-types/{issue_type_id}",
  },
});
