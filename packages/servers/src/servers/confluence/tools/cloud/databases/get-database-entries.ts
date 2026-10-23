import { defineTool } from "@usemcpkit/core";

export const cloudDatabasesGetDatabaseEntries = defineTool({
  name: "cloud:databases:get_database_entries",
  description:
    "[Cloud] Get entries for database. Returns the entries (rows) of a database, with optional filtering, sorting, and cursor-based pagination. Entry values are keyed by field ID; use Get fields for database (`GET /databases/{id}/fields`) to map field IDs to names.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The Confluence content ID of the database, represented as an ASCII decimal-digit string.",
      },
      limit: {
        type: "integer",
        description:
          "Maximum number of results to return. The value must be a positive integer without a sign, decimal point, or leading zero. The default is 50 and the maximum is 250.",
      },
      cursor: {
        type: "string",
        description:
          "Opaque, offset-based continuation token obtained from `_links.next` or the `Link` response header. A cursor is scoped to the database, collection endpoint, filters, sort, and page size that produced it. Reusing a well-formed cursor with any different query context returns `CURSOR_QUERY_MISMATCH`; malformed or structurally invalid cursors return `INVALID_CURSOR`, and a decoded but unsupported vers…",
      },
      sort: {
        type: "string",
        description:
          "Used to sort the result by a single field ID. Prefix the field ID with `-` to sort in descending order. Text, number, checkbox, date, select, and hyperlink fields are sortable. Other field types return `FIELD_NOT_SORTABLE`. The `fieldId:modifier` form is reserved and returns `UNSUPPORTED_SORT_MODIFIER`.",
      },
      filter: {
        type: "object",
        description:
          "Filters entries by field value. Bracket-scoped on field ID, for example `filter[fieldId]=value`. The grammar forms are: - `filter[fieldId]=value` (implicit equality) - `filter[fieldId]=eq:value` (explicit equality) - `filter[fieldId]=in:value1,value2` - `filter[fieldId]=$empty` - `filter[fieldId][gte|lte|gt|lt]=value` (date and number fields only)",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/wiki/api/v2/databases/{id}/entries",
    query: ["limit", "cursor", "sort", "filter"],
  },
});
