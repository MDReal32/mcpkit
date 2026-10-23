import { defineTool } from "@usemcpkit/core";

export const fieldsIssueSecuritySchemesSetDefaultLevels = defineTool({
  name: "fields:issue_security_schemes:set_default_levels",
  description: "Set default issue security levels. Sets default issue security levels for schemes.",
  input: {
    type: "object",
    properties: {
      defaultValues: {
        type: "array",
        description: "List of objects with issue security scheme ID and new default level ID.",
        items: {
          type: "object",
          description: "Details of scheme and new default level.",
          properties: {
            defaultLevelId: {
              type: "string",
              description:
                "The ID of the issue security level to set as default for the specified scheme. Providing null will reset the default level.",
            },
            issueSecuritySchemeId: {
              type: "string",
              description: "The ID of the issue security scheme to set default level for.",
            },
          },
          required: ["defaultLevelId", "issueSecuritySchemeId"],
        },
      },
    },
    required: ["defaultValues"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuesecurityschemes/level/default",
    body: ["defaultValues"],
  },
});
