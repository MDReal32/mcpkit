import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldContextsRemoveCustomFieldContextFromProjects = defineTool({
  name: "fields:issue_custom_field_contexts:remove_custom_field_context_from_projects",
  description: "Remove custom field context from projects. Removes a custom field context from projects.",
  input: {
    type: "object",
    properties: {
      fieldId: {
        type: "string",
        description: "The ID of the custom field.",
      },
      contextId: {
        type: "integer",
        description: "The ID of the context.",
      },
      projectIds: {
        type: "array",
        description: "The IDs of projects.",
        items: {
          type: "string",
        },
      },
    },
    required: ["fieldId", "contextId", "projectIds"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/field/{fieldId}/context/{contextId}/project/remove",
    body: ["projectIds"],
  },
});
