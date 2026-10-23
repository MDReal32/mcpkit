import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesUpdateFieldAssociationScheme = defineTool({
  name: "fields:field_schemes:update_field_association_scheme",
  description: "Update field scheme. Endpoint for updating an existing field association scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
      description: {
        type: "string",
        description: "The description value to update",
      },
      name: {
        type: "string",
        description: "The name value to update",
      },
    },
    required: ["id"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/config/fieldschemes/{id}",
    body: ["description", "name"],
  },
});
