import { defineTool } from "@usemcpkit/core";

export const filesDevResourcesDeleteDevResource = defineTool({
  name: "files:dev_resources:delete_dev_resource",
  description: "Delete dev resource. Delete a dev resource from a file",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description: "The file to delete the dev resource from. This must be a main file key, not a branch key.",
      },
      dev_resource_id: {
        type: "string",
        description: "The id of the dev resource to delete.",
      },
    },
    required: ["file_key", "dev_resource_id"],
  },
  request: {
    method: "DELETE",
    path: "/v1/files/{file_key}/dev_resources/{dev_resource_id}",
  },
});
