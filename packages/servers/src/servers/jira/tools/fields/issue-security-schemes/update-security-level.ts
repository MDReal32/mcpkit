import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesUpdateSecurityLevel = defineTool({
  name: "fields:issue_security_schemes:update_security_level",
  description: "Update issue security level. Updates the issue security level.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "string",
        description: "The ID of the issue security scheme level belongs to.",
      },
      levelId: {
        type: "string",
        description: "The ID of the issue security level to update.",
      },
      description: {
        type: "string",
        description: "The description of the issue security scheme level.",
      },
      name: {
        type: "string",
        description: "The name of the issue security scheme level. Must be unique.",
      },
    },
    required: ["schemeId", "levelId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuesecurityschemes/{schemeId}/level/{levelId}",
    body: ["description", "name"],
  },
});
