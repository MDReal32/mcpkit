import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypePropertiesGetIssueTypePropertyKeys = defineTool({
  name: "workflows:issue_type_properties:get_issue_type_property_keys",
  description: "Get issue type property keys. Returns all the issue type property keys of the issue type.",
  input: {
    type: "object",
    properties: {
      issueTypeId: {
        type: "string",
        description: "The ID of the issue type.",
      },
    },
    required: ["issueTypeId"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetype/{issueTypeId}/properties",
  },
});
