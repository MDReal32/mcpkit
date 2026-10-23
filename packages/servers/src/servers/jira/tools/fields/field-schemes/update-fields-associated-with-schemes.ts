import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesUpdateFieldsAssociatedWithSchemes = defineTool({
  name: "fields:field_schemes:update_fields_associated_with_schemes",
  description: "Update fields associated with field schemes. Update fields associated with field association schemes.",
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
    path: "/rest/api/2/config/fieldschemes/fields",
    bodyArg: "body",
  },
});
