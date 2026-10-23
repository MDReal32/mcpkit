import { defineTool } from "@usemcpkit/core";

export const issuesIssuePropertiesSetIssueProperty = defineTool({
  name: "issues:issue_properties:set_issue_property",
  description:
    "Set issue property. Sets the value of an issue's property. Use this resource to store custom data against an issue.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      propertyKey: {
        type: "string",
        description: "The key of the issue property. The maximum length is 255 characters.",
      },
      body: {},
    },
    required: ["issueIdOrKey", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issue/{issueIdOrKey}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
