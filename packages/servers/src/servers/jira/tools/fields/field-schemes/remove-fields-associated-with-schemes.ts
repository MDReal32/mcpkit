import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesRemoveFieldsAssociatedWithSchemes = defineTool({
  name: "fields:field_schemes:remove_fields_associated_with_schemes",
  description: "Remove fields associated with field schemes. Remove fields associated with field association schemes.",
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
    path: "/rest/api/2/config/fieldschemes/fields",
    bodyArg: "body",
  },
});
