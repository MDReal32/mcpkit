import { defineTool } from "@usemcpkit/core";

export const issuesIssuePropertiesBulkDeleteIssueProperty = defineTool({
  name: "issues:issue_properties:bulk_delete_issue_property",
  description:
    "Bulk delete issue property. Deletes a property value from multiple issues. The issues to be updated can be specified by filter criteria.",
  input: {
    type: "object",
    properties: {
      propertyKey: {
        type: "string",
        description: "The key of the property.",
      },
      currentValue: {
        description: "The value of properties to perform the bulk operation on.",
      },
      entityIds: {
        type: "array",
        description: "List of issues to perform the bulk delete operation on.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["propertyKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/issue/properties/{propertyKey}",
    body: ["currentValue", "entityIds"],
  },
});
