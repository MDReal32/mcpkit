import { defineTool } from "@usemcpkit/core";

export const cloudV1ContentRestoreContentVersion = defineTool({
  name: "cloud_v1:content:restore_content_version",
  description:
    "[Cloud v1] Restore content version. Restores a historical version to be the latest version. That is, a new version is created with the content of the historical version.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the content for which the history will be restored.",
      },
      expand: {
        type: "string",
        description:
          "A multi-value parameter indicating which properties of the content to expand. By default, the `content` object is expanded. (comma-separated)",
      },
      operationKey: {
        type: "string",
        description: "Set to 'restore'.",
        enum: ["restore"],
      },
      params: {
        type: "object",
        properties: {
          versionNumber: {
            type: "integer",
            description: "The version number to be restored.",
          },
          message: {
            type: "string",
            description: "Description for the version.",
          },
          restoreTitle: {
            type: "boolean",
            description:
              "If true, the content title will be the same as the title from the version restored. Defaults to `false`.",
          },
        },
        required: ["message", "versionNumber"],
      },
    },
    required: ["id", "operationKey", "params"],
  },
  request: {
    method: "POST",
    path: "/wiki/rest/api/content/{id}/version",
    query: ["expand"],
    body: ["operationKey", "params"],
  },
});
