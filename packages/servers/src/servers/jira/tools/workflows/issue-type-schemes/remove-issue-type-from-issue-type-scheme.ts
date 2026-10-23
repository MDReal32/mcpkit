import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeSchemesRemoveIssueTypeFromIssueTypeScheme = defineTool({
  name: "workflows:issue_type_schemes:remove_issue_type_from_issue_type_scheme",
  description: "Remove issue type from issue type scheme. Removes an issue type from an issue type scheme.",
  input: {
    type: "object",
    properties: {
      issueTypeSchemeId: {
        type: "integer",
        description: "The ID of the issue type scheme.",
      },
      issueTypeId: {
        type: "integer",
        description: "The ID of the issue type.",
      },
    },
    required: ["issueTypeSchemeId", "issueTypeId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issuetypescheme/{issueTypeSchemeId}/issuetype/{issueTypeId}",
  },
});
