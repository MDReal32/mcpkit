import { defineTool } from "@usemcpkit/core";

export const filesDevResourcesPutDevResources = defineTool({
  name: "files:dev_resources:put_dev_resources",
  description: "Update dev resources. Bulk update dev resources across multiple files.",
  input: {
    type: "object",
    properties: {
      dev_resources: {
        type: "array",
        description: "An array of dev resources.",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Unique identifier of the dev resource",
            },
            name: {
              type: "string",
              description: "The name of the dev resource.",
            },
            url: {
              type: "string",
              description: "The URL of the dev resource.",
            },
          },
          required: ["id"],
        },
      },
    },
    required: ["dev_resources"],
  },
  request: {
    method: "PUT",
    path: "/v1/dev_resources",
    body: ["dev_resources"],
  },
});
