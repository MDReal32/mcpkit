import { defineTool } from "@usemcpkit/core";

export const libraryLibraryAnalyticsGetLibraryAnalyticsComponentActions = defineTool({
  name: "library:library_analytics:get_library_analytics_component_actions",
  description:
    "Get library analytics component action data. Returns a list of library analytics component actions data broken down by the requested dimension.",
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
        enum: ["component", "team"],
        description: "A dimension to group returned analytics data by.",
      },
      start_date: {
        type: "string",
        description:
          "ISO 8601 date string (YYYY-MM-DD) of the earliest week to include. Dates are rounded back to the nearest start of a week. Defaults to one year prior.",
      },
      end_date: {
        type: "string",
        description:
          "ISO 8601 date string (YYYY-MM-DD) of the latest week to include. Dates are rounded forward to the nearest end of a week. Defaults to the latest computed week.",
      },
    },
    required: ["file_key", "group_by"],
  },
  request: {
    method: "GET",
    path: "/v1/analytics/libraries/{file_key}/component/actions",
    query: ["cursor", "group_by", "start_date", "end_date"],
  },
});
