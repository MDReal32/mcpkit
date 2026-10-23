import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecurityLevelGetIssueSecurityLevel = defineTool({
  name: "fields:issue_security_level:get_issue_security_level",
  description: "Get issue security level. Returns details of an issue security level.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue security level.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/securitylevel/{id}",
  },
});
