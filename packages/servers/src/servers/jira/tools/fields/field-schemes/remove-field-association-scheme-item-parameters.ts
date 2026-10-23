import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesRemoveFieldAssociationSchemeItemParameters = defineTool({
  name: "fields:field_schemes:remove_field_association_scheme_item_parameters",
  description: "Remove field parameters. Remove field association parameters overrides for work types.",
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
    method: "DELETE",
    path: "/rest/api/2/config/fieldschemes/fields/parameters",
    bodyArg: "body",
  },
});
