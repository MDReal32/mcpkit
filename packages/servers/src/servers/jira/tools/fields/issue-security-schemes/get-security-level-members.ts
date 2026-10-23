import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesGetSecurityLevelMembers = defineTool({
  name: "fields:issue_security_schemes:get_security_level_members",
  description: "Get issue security level members. Returns a paginated list of issue security level members.",
  input: {
    type: "object",
    properties: {
      startAt: {
        type: "string",
        default: "0",
        description: "The index of the first item to return in a page of results (page offset).",
      },
      maxResults: {
        type: "string",
        default: "50",
        description: "The maximum number of items to return per page.",
      },
      id: {
        type: "string",
        description:
          "The list of issue security level member IDs. To include multiple issue security level members separate IDs with an ampersand: `id=10000&id=10001`. (comma-separated)",
      },
      schemeId: {
        type: "string",
        description:
          "The list of issue security scheme IDs. To include multiple issue security schemes separate IDs with an ampersand: `schemeId=10000&schemeId=10001`. (comma-separated)",
      },
      levelId: {
        type: "string",
        description:
          "The list of issue security level IDs. To include multiple issue security levels separate IDs with an ampersand: `levelId=10000&levelId=10001`. (comma-separated)",
      },
      expand: {
        type: "string",
        description:
          "Use expand to include additional information in the response. This parameter accepts a comma-separated list. Expand options include:",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuesecurityschemes/level/member",
    query: ["startAt", "maxResults", "id", "schemeId", "levelId", "expand"],
  },
});
