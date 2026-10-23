import { defineTool } from "@usemcpkit/core";

export const aiOrbitCreateOrbitQueryPost = defineTool({
  name: "ai:orbit:create_orbit_query_post",
  description:
    "Execute a named query. Executes a server-defined named query against the Orbit gRPC service. Requires a JSON request body: form encoding stringifies nested parameter values, which the per-query parameter schemas reject.",
  input: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Named query identifier",
      },
      parameters: {
        type: "object",
        description: "Named query parameters",
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
    required: ["name"],
  },
  request: {
    method: "POST",
    path: "/orbit/query/{name}",
    body: ["parameters", "response_format", "source_type"],
  },
});
