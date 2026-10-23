import { defineTool } from "@usemcpkit/core";

export const administrationAuditRecordsGetAuditRecords = defineTool({
  name: "administration:audit_records:get_audit_records",
  description: "Get audit records. Returns a list of audit records. The list can be filtered to include items:",
  input: {
    type: "object",
    properties: {
      offset: {
        type: "integer",
        default: 0,
        description: "The number of records to skip before returning the first result.",
      },
      limit: {
        type: "integer",
        default: 1000,
        description: "The maximum number of results to return.",
      },
      filter: {
        type: "string",
        description: "The strings to match with audit field content, space separated.",
      },
      from: {
        type: "string",
        description:
          "The date and time on or after which returned audit records must have been created. If `to` is provided `from` must be before `to` or no audit records are returned.",
      },
      to: {
        type: "string",
        description:
          "The date and time on or before which returned audit results must have been created. If `from` is provided `to` must be after `from` or no audit records are returned.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/auditing/record",
    query: ["offset", "limit", "filter", "from", "to"],
  },
});
