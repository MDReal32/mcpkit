import { defineTool } from "@usemcpkit/core";

export const cloudV1AuditGetAuditRecords = defineTool({
  name: "cloud_v1:audit:get_audit_records",
  description:
    "[Cloud v1] Get audit records. Returns all records in the audit log, optionally for a certain date range. This contains information about events like space exports, group membership changes, app installations, etc. For more information, see Audit log in the Confluence administrator's guide.",
  input: {
    type: "object",
    properties: {
      startDate: {
        type: "string",
        description:
          "Filters the results to the records on or after the `startDate`. The `startDate` must be specified as epoch time in milliseconds.",
      },
      endDate: {
        type: "string",
        description:
          "Filters the results to the records on or before the `endDate`. The `endDate` must be specified as epoch time in milliseconds.",
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
    path: "/wiki/rest/api/audit",
    query: ["startDate", "endDate", "searchString", "start", "limit"],
  },
});
