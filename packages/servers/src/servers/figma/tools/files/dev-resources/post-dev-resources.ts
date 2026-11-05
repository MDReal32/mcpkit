import { defineTool } from "@usemcpkit/core";

export const filesDevResourcesPostDevResources = defineTool({
  name: "files:dev_resources:post_dev_resources",
  description:
    "Create dev resources. Bulk create dev resources across multiple files. Dev resources that are successfully created will show up in the links_created array in the response.",
  input: {
    type: "object",
    properties: {
      dev_resources: {
        type: "array",
        description: "An array of dev resources.",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the dev resource.",
            },
            url: {
              type: "string",
              description: "The URL of the dev resource.",
            },
            file_key: {
              type: "string",
              description: "The file key where the dev resource belongs.",
            },
            node_id: {
              type: "string",
              description: "The target node to attach the dev resource to.",
            },
          },
          required: ["name", "url", "file_key", "node_id"],
        },
      },
    },
    required: ["dev_resources"],
  },
  request: {
    method: "POST",
    path: "/v1/dev_resources",
    body: ["dev_resources"],
  },
});
