import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesUpdateFieldAssociationSchemeItemParameters = defineTool({
  name: "fields:field_schemes:update_field_association_scheme_item_parameters",
  description: "Update field parameters. Update field association item parameters in field association schemes.",
  input: {
    type: "object",
    properties: {
      body: {
        type: "object",
      },
    },
    required: ["body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/config/fieldschemes/fields/parameters",
    bodyArg: "body",
  },
});
