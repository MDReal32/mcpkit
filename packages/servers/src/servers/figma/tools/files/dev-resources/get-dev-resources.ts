import { defineTool } from "@usemcpkit/core";

export const filesDevResourcesGetDevResources = defineTool({
  name: "files:dev_resources:get_dev_resources",
  description: "Get dev resources. Get dev resources in a file",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description: "The file to get the dev resources from. This must be a main file key, not a branch key.",
      },
      node_ids: {
        type: "string",
        description:
          "Comma separated list of nodes that you care about in the document. If specified, only dev resources attached to these nodes will be returned. If not specified, all dev resources in the file will be returned.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/dev_resources",
    query: ["node_ids"],
  },
});
