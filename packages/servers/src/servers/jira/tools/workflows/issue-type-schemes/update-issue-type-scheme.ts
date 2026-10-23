import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeSchemesUpdateIssueTypeScheme = defineTool({
  name: "workflows:issue_type_schemes:update_issue_type_scheme",
  description: "Update issue type scheme. Updates an issue type scheme.",
  input: {
    type: "object",
    properties: {
      issueTypeSchemeId: {
        type: "integer",
        description: "The ID of the issue type scheme.",
      },
      defaultIssueTypeId: {
        type: "string",
        description: "The ID of the default issue type of the issue type scheme.",
      },
      description: {
        type: "string",
        description: "The description of the issue type scheme. The maximum length is 4000 characters.",
      },
      name: {
        type: "string",
        description:
          "The name of the issue type scheme. The name must be unique. The maximum length is 255 characters.",
      },
    },
    required: ["issueTypeSchemeId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuetypescheme/{issueTypeSchemeId}",
    body: ["defaultIssueTypeId", "description", "name"],
  },
});
