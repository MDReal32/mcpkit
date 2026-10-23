import { defineTool } from "@usemcpkit/core";

export const fieldsIssueCustomFieldAssociationsRemoveAssociations = defineTool({
  name: "fields:issue_custom_field_associations:remove_associations",
  description: "Remove associations. Unassociates a set of fields with a project and issue type context.",
  input: {
    type: "object",
    properties: {
      associationContexts: {
        type: "array",
        description: "Contexts to associate/unassociate the fields with.",
        items: {
          type: "object",
          description: "Field association for example PROJECT\\_ID.",
          properties: {
            identifier: {
              type: "object",
            },
            type: {
              type: "string",
            },
          },
          required: ["type"],
        },
      },
      fields: {
        type: "array",
        description: "Fields to associate/unassociate with projects.",
        items: {
          type: "object",
          description: "Identifier for a field for example FIELD\\_ID.",
          properties: {
            identifier: {
              type: "object",
            },
            type: {
              type: "string",
            },
          },
          required: ["type"],
        },
      },
    },
    required: ["associationContexts", "fields"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/field/association",
    body: ["associationContexts", "fields"],
  },
});
