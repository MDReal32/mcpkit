import { defineTool } from "@usemcpkit/core";

export const metaGlqlCreateGlql = defineTool({
  name: "meta:glql:create_glql",
  description: "Execute a GLQL query. Executes a GLQL query to search and filter GitLab resources.",
  input: {
    type: "object",
    properties: {
      glql_yaml: {
        type: "string",
        description:
          "GLQL query that may include YAML configuration. Maximum size is 10,000 bytes. See query formats for details.",
      },
      after: {
        type: "string",
        description:
          "Cursor for pagination. Use the `data.pageInfo.endCursor` value from a previous query to fetch the next page of results.",
      },
    },
    required: ["glql_yaml"],
  },
  request: {
    method: "POST",
    path: "/glql",
    body: ["glql_yaml", "after"],
  },
});
