import { defineTool } from "@usemcpkit/core";

export const metaMetaGetAllVersions = defineTool({
  name: "meta:meta:get_all_versions",
  description: "Get all API versions. Get all supported GitHub API versions.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/versions",
  },
});
