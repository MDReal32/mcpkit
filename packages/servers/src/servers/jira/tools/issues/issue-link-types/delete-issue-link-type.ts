import { defineTool } from "@usemcpkit/core";

export const issuesIssueLinkTypesDeleteIssueLinkType = defineTool({
  name: "issues:issue_link_types:delete_issue_link_type",
  description: "Delete issue link type. Deletes an issue link type.",
  input: {
    type: "object",
    properties: {
      issueLinkTypeId: {
        type: "string",
        description: "The ID of the issue link type.",
      },
    },
    required: ["issueLinkTypeId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issueLinkType/{issueLinkTypeId}",
  },
});
