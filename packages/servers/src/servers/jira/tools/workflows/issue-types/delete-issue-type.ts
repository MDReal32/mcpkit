import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypesDeleteIssueType = defineTool({
  name: "workflows:issue_types:delete_issue_type",
  description:
    "Delete issue type. Deletes the issue type. If the issue type is in use, all uses are updated with the alternative issue type (`alternativeIssueTypeId`). A list of alternative issue types are obtained from the Get alternative issue types resource.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue type.",
      },
      alternativeIssueTypeId: {
        type: "string",
        description: "The ID of the replacement issue type.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issuetype/{id}",
    query: ["alternativeIssueTypeId"],
  },
});
