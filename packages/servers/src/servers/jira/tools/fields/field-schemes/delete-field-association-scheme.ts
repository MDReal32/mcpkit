import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesDeleteFieldAssociationScheme = defineTool({
  name: "fields:field_schemes:delete_field_association_scheme",
  description: "Delete a field scheme. Delete a specified field association scheme",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the field association scheme to delete.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/config/fieldschemes/{id}",
  },
});
