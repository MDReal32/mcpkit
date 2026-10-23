import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecurityLevelGetIssueSecurityLevelMembers = defineTool({
  name: "fields:issue_security_level:get_issue_security_level_members",
  description: "Get issue security level members by issue security scheme. Returns issue security level members.",
  input: {
    type: "object",
    properties: {
      issueSecuritySchemeId: {
        type: "integer",
        description:
          "The ID of the issue security scheme. Use the Get issue security schemes operation to get a list of issue security scheme IDs.",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of items to return per page.",
      },
      issueSecurityLevelId: {
        type: "string",
        description:
          "The list of issue security level IDs. To include multiple issue security levels separate IDs with ampersand: `issueSecurityLevelId=10000&issueSecurityLevelId=10001`. (comma-separated)",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
    required: ["issueSecuritySchemeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuesecurityschemes/{issueSecuritySchemeId}/members",
    query: ["startAt", "maxResults", "issueSecurityLevelId", "expand"],
  },
});
