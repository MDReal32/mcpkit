import { defineTool } from "@usemcpkit/core";

export const issuesIssuePropertiesGetIssuePropertyKeys = defineTool({
  name: "issues:issue_properties:get_issue_property_keys",
  description: "Get issue property keys. Returns the URLs and keys of an issue's properties.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The key or ID of the issue.",
      },
    },
    required: ["issueIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}/properties",
  },
});
