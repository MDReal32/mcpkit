import { defineTool } from "@usemcpkit/core";

export const instanceDiscoverGetDiscover = defineTool({
  name: "instance:discover:get_discover",
  description:
    "Discover available API capabilities. Returns a filtered capability map based on the caller's API key scopes. Each resource includes the operations and endpoints accessible to the authenticated API key. Use query parameters to narrow the response.",
  input: {
    type: "object",
    properties: {
      include: {
        type: "string",
        description:
          'Include additional data. Use "schemas" to inline request body schemas per endpoint, eliminating the need to fetch the full OpenAPI spec.',
        enum: ["schemas"],
      },
      resource: {
        type: "string",
        description: 'Filter to a specific resource (e.g. "workflow", "tags", "credential").',
      },
      operation: {
        type: "string",
        description: 'Filter to endpoints with a specific operation (e.g. "read", "create", "list").',
      },
    },
  },
  request: {
    method: "GET",
    path: "/discover",
    query: ["include", "resource", "operation"],
  },
});
