import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesCreateIssueTypeScreenScheme = defineTool({
  name: "workflows:issue_type_screen_schemes:create_issue_type_screen_scheme",
  description: "Create issue type screen scheme. Creates an issue type screen scheme.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "The description of the issue type screen scheme. The maximum length is 255 characters.",
      },
      issueTypeMappings: {
        type: "array",
        description:
          "The IDs of the screen schemes for the issue type IDs and *default*. A *default* entry is required to create an issue type screen scheme, it defines the mapping for all issue types without a screen scheme.",
        items: {
          type: "object",
          description: "The IDs of the screen schemes for the issue type IDs.",
          properties: {
            issueTypeId: {
              type: "string",
              description:
                "The ID of the issue type or *default*. Only issue types used in classic projects are accepted. An entry for *default* must be provided and defines the mapping for all issue types without a screen scheme.",
            },
            screenSchemeId: {
              type: "string",
              description: "The ID of the screen scheme. Only screen schemes used in classic projects are accepted.",
            },
          },
          required: ["issueTypeId", "screenSchemeId"],
        },
      },
      name: {
        type: "string",
        description:
          "The name of the issue type screen scheme. The name must be unique. The maximum length is 255 characters.",
      },
    },
    required: ["issueTypeMappings", "name"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issuetypescreenscheme",
    body: ["description", "issueTypeMappings", "name"],
  },
});
