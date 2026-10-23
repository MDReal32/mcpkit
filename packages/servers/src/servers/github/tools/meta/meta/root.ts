import { defineTool } from "@usemcpkit/core";

export const metaMetaRoot = defineTool({
  name: "meta:meta:root",
  description: "GitHub API Root. Get Hypermedia links to resources accessible in GitHub's REST API",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/",
  },
});
