import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesUpdateIssueSecurityScheme = defineTool({
  name: "fields:issue_security_schemes:update_issue_security_scheme",
  description: "Update issue security scheme. Updates the issue security scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue security scheme.",
      },
      description: {
        type: "string",
        description: "The description of the security scheme scheme.",
      },
      name: {
        type: "string",
        description: "The name of the security scheme scheme. Must be unique.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuesecurityschemes/{id}",
    body: ["description", "name"],
  },
});
