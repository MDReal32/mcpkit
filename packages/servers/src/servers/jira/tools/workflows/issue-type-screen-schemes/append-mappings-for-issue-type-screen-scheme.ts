import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesAppendMappingsForIssueTypeScreenScheme = defineTool({
  name: "workflows:issue_type_screen_schemes:append_mappings_for_issue_type_screen_scheme",
  description:
    "Append mappings to issue type screen scheme. Appends issue type to screen scheme mappings to an issue type screen scheme.",
  input: {
    type: "object",
    properties: {
      issueTypeScreenSchemeId: {
        type: "string",
        description: "The ID of the issue type screen scheme.",
      },
      issueTypeMappings: {
        type: "array",
        description:
          "The list of issue type to screen scheme mappings. A *default* entry cannot be specified because a default entry is added when an issue type screen scheme is created.",
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
    },
    required: ["issueTypeScreenSchemeId", "issueTypeMappings"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping",
    body: ["issueTypeMappings"],
  },
});
