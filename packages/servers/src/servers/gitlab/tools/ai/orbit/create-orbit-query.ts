import { defineTool } from "@usemcpkit/core";

export const aiOrbitCreateOrbitQuery = defineTool({
  name: "ai:orbit:create_orbit_query",
  description: "Execute a query. Executes a query against the Orbit gRPC service.",
  input: {
    type: "object",
    properties: {
      query: {
        type: "object",
        description: "JSON query object, or GQL text when enabled for the current user",
      },
      response_format: {
        type: "string",
        description: "Response format: raw, llm, or gql",
        default: "raw",
        enum: ["raw", "llm", "gql"],
      },
      source_type: {
        type: "string",
        description: "Optional frontend source subtype (e.g. code_intelligence)",
      },
    },
    required: ["query"],
  },
  request: {
    method: "POST",
    path: "/orbit/query",
    body: ["query", "response_format", "source_type"],
  },
});
