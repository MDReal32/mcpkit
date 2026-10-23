import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesAddSecurityLevelMembers = defineTool({
  name: "fields:issue_security_schemes:add_security_level_members",
  description:
    "Add issue security level members. Adds members to the issue security level. You can add up to 100 members per request.",
  input: {
    type: "object",
    properties: {
      schemeId: {
        type: "string",
        description: "The ID of the issue security scheme.",
      },
      levelId: {
        type: "string",
        description: "The ID of the issue security level.",
      },
      members: {
        type: "array",
        description: "The list of level members which should be added to the issue security scheme level.",
        items: {
          type: "object",
          properties: {
            parameter: {
              type: "string",
              description: "The value corresponding to the specified member type.",
            },
            type: {
              type: "string",
              description:
                "The issue security level member type, e.g `reporter`, `group`, `user`, `projectrole`, `applicationRole`.",
            },
          },
          required: ["type"],
        },
      },
    },
    required: ["schemeId", "levelId"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuesecurityschemes/{schemeId}/level/{levelId}/member",
    body: ["members"],
  },
});
