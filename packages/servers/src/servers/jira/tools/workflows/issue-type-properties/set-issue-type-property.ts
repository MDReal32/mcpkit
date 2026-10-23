import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypePropertiesSetIssueTypeProperty = defineTool({
  name: "workflows:issue_type_properties:set_issue_type_property",
  description:
    "Set issue type property. Creates or updates the value of the issue type property. Use this resource to store and update data against an issue type.",
  input: {
    type: "object",
    properties: {
      issueTypeId: {
        type: "string",
        description: "The ID of the issue type.",
      },
      propertyKey: {
        type: "string",
        description: "The key of the issue type property. The maximum length is 255 characters.",
      },
      body: {},
    },
    required: ["issueTypeId", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/issuetype/{issueTypeId}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
