import { defineTool } from "@usemcpkit/core";

export const cloudV1AuditGetAuditRecordsForTimePeriod = defineTool({
  name: "cloud_v1:audit:get_audit_records_for_time_period",
  description:
    "[Cloud v1] Get audit records for time period. Returns records from the audit log, for a time period back from the current date. For example, you can use this method to get the last 3 months of records.",
  input: {
    type: "object",
    properties: {
      number: {
        type: "integer",
        description: "The number of units for the time period.",
      },
      units: {
        type: "string",
        enum: [
          "NANOS",
          "MICROS",
          "MILLIS",
          "SECONDS",
          "MINUTES",
          "HOURS",
          "HALF_DAYS",
          "DAYS",
          "WEEKS",
          "MONTHS",
          "YEARS",
          "DECADES",
          "CENTURIES",
        ],
        description: "The unit of time that the time period is measured in.",
      },
      searchString: {
        type: "string",
        description: "Filters the results to records that have string property values matching the `searchString`.",
      },
      start: {
        type: "integer",
        description: "The starting index of the returned records.",
      },
      limit: {
        type: "integer",
        description:
          "The maximum number of records to return per page. Note, this may be restricted by fixed system limits.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/wiki/rest/api/audit/since",
    query: ["number", "units", "searchString", "start", "limit"],
  },
});
