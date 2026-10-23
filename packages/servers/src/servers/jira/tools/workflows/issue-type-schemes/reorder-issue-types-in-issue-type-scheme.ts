import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeSchemesReorderIssueTypesInIssueTypeScheme = defineTool({
  name: "workflows:issue_type_schemes:reorder_issue_types_in_issue_type_scheme",
  description: "Change order of issue types. Changes the order of issue types in an issue type scheme.",
  input: {
    type: "object",
    properties: {
      issueTypeSchemeId: {
        type: "integer",
        description: "The ID of the issue type scheme.",
      },
      after: {
        type: "string",
        description:
          "The ID of the issue type to place the moved issue types after. Required if `position` isn't provided.",
      },
      issueTypeIds: {
        type: "array",
        description:
          "A list of the issue type IDs to move. The order of the issue type IDs in the list is the order they are given after the move.",
        items: {
          type: "string",
        },
      },
      position: {
        type: "string",
        description: "The position the issue types should be moved to. Required if `after` isn't provided.",
        enum: ["First", "Last"],
      },
    },
    required: ["issueTypeSchemeId", "issueTypeIds"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuetypescheme/{issueTypeSchemeId}/issuetype/move",
    body: ["after", "issueTypeIds", "position"],
  },
});
