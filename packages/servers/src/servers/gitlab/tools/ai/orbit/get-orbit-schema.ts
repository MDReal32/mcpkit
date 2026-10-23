import { defineTool } from "@usemcpkit/core";

export const aiOrbitGetOrbitSchema = defineTool({
  name: "ai:orbit:get_orbit_schema",
  description: "Retrieve the schema. Retrieves the Orbit schema.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        description: "Comma-separated node names to expand",
      },
      response_format: {
        type: "string",
        default: "raw",
        enum: ["raw", "llm"],
        description: "Response format: raw or llm",
      },
    },
  },
  request: {
    method: "GET",
    path: "/orbit/schema",
    query: ["expand", "response_format"],
  },
});
