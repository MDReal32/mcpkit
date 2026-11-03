import { defineTool } from "@usemcpkit/core";

export const libraryLibraryAnalyticsGetLibraryAnalyticsVariableUsages = defineTool({
  name: "library:library_analytics:get_library_analytics_variable_usages",
  description:
    "Get library analytics variable usage data. Returns a list of library analytics variable usage data broken down by the requested dimension.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description: "File key of the library to fetch analytics data for.",
      },
      cursor: {
        type: "string",
        description: "Cursor indicating what page of data to fetch. Obtained from prior API call.",
      },
      group_by: {
        type: "string",
        enum: ["variable", "file"],
        description: "A dimension to group returned analytics data by.",
      },
    },
    required: ["file_key", "group_by"],
  },
  request: {
    method: "GET",
    path: "/v1/analytics/libraries/{file_key}/variable/usages",
    query: ["cursor", "group_by"],
  },
});
