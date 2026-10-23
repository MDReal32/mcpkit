import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypeScreenSchemesRemoveMappingsFromIssueTypeScreenScheme = defineTool({
  name: "workflows:issue_type_screen_schemes:remove_mappings_from_issue_type_screen_scheme",
  description:
    "Remove mappings from issue type screen scheme. Removes issue type to screen scheme mappings from an issue type screen scheme.",
  input: {
    type: "object",
    properties: {
      issueTypeScreenSchemeId: {
        type: "string",
        description: "The ID of the issue type screen scheme.",
      },
      issueTypeIds: {
        type: "array",
        description: "The list of issue type IDs.",
        items: {
          type: "string",
        },
      },
    },
    required: ["issueTypeScreenSchemeId", "issueTypeIds"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/issuetypescreenscheme/{issueTypeScreenSchemeId}/mapping/remove",
    body: ["issueTypeIds"],
  },
});
