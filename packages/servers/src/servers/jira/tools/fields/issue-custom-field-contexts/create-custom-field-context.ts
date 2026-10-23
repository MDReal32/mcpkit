import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsCreateCustomFieldContext = defineTool({
  name: "fields:issue_custom_field_contexts:create_custom_field_context",
  description: "Create custom field context. Creates a custom field context.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
      },
      description: {
        type: "string",
        description: "The description of the context.",
      },
      id: {
        type: "string",
        description: "The ID of the context.",
      },
      issueTypeIds: {
        type: "array",
        description:
          "The list of issue types IDs for the context. If the list is empty, the context refers to all issue types.",
        items: {
          type: "string",
        },
      },
      name: {
        type: "string",
        description: "The name of the context.",
      },
      projectIds: {
        type: "array",
        description:
          "The list of project IDs associated with the context. If the list is empty, the context is global.",
        items: {
          type: "string",
        },
      },
    },
    required: ["fieldId", "name"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/field/{fieldId}/context",
    body: ["description", "id", "issueTypeIds", "name", "projectIds"],
  },
});
