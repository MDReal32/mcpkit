import { defineTool } from "@usemcpkit/core";

export const issuesIssueWorklogPropertiesSetWorklogProperty = defineTool({
  name: "issues:issue_worklog_properties:set_worklog_property",
  description:
    "Set worklog property. Sets the value of a worklog property. Use this operation to store custom data against the worklog.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      worklogId: {
        type: "string",
        description: "The ID of the worklog.",
      },
      propertyKey: {
        type: "string",
        description: "The key of the issue property. The maximum length is 255 characters.",
      },
      body: {},
    },
    required: ["issueIdOrKey", "worklogId", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issue/{issueIdOrKey}/worklog/{worklogId}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
