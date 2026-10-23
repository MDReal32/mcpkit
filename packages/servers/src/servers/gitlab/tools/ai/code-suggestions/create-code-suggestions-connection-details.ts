import { defineTool } from "@usemcpkit/core";

export const aiCodeSuggestionsCreateCodeSuggestionsConnectionDetails = defineTool({
  name: "ai:code_suggestions:create_code_suggestions_connection_details",
  description:
    "Retrieve connection details. Retrieves user-specific connection details which can be used by IDEs or clients for telemetry, including an instance-specific application ID, application access token, and clickhouse data plane URL.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "POST",
    path: "/code_suggestions/connection_details",
  },
});
