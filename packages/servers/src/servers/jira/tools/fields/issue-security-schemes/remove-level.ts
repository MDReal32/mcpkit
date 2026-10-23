import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesRemoveLevel = defineTool({
  name: "fields:issue_security_schemes:remove_level",
  description: "Remove issue security level. Deletes an issue security level.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "string",
        description: "The ID of the issue security scheme.",
      },
      levelId: {
        type: "string",
        description: "The ID of the issue security level to remove.",
      },
      replaceWith: {
        type: "string",
        description: "The ID of the issue security level that will replace the currently selected level.",
      },
    },
    required: ["schemeId", "levelId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issuesecurityschemes/{schemeId}/level/{levelId}",
    query: ["replaceWith"],
  },
});
