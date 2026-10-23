import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesSearchFieldAssociationSchemeFields = defineTool({
  name: "fields:field_schemes:search_field_association_scheme_fields",
  description: "Search field scheme fields. Search for fields belonging to a given field association scheme.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The scheme ID to search for child fields",
      },
      startAt: {
        type: "integer",
        default: 0,
        description: "The starting index of the returned fields. Base index: 0.",
      },
      maxResults: {
        type: "integer",
        default: 50,
        description: "The maximum number of fields to return per page, maximum allowed value is 100.",
      },
      fieldId: {
        type: "string",
        description:
          "The field IDs to filter by, if empty then all fields belonging to a field association scheme will be returned (comma-separated)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/config/fieldschemes/{id}/fields",
    query: ["startAt", "maxResults", "fieldId"],
  },
});
