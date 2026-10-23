import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesCreateFieldAssociationScheme = defineTool({
  name: "fields:field_schemes:create_field_association_scheme",
  description: "Create field scheme. Endpoint for creating a new field association scheme.",
  input: {
    type: "object",
    properties: {
      description: {
        type: "string",
        description: "Description of the scheme to be created",
      },
      name: {
        type: "string",
        description: "The name of the scheme to be created",
      },
    },
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/config/fieldschemes",
    body: ["description", "name"],
  },
});
