import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesDeleteSecurityScheme = defineTool({
  name: "fields:issue_security_schemes:delete_security_scheme",
  description: "Delete issue security scheme. Deletes an issue security scheme.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "string",
        description: "The ID of the issue security scheme.",
      },
    },
    required: ["schemeId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issuesecurityschemes/{schemeId}",
  },
});
