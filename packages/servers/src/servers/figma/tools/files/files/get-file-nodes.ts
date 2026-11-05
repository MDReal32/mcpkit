import { defineTool } from "@usemcpkit/core";

export const filesFilesGetFileNodes = defineTool({
  name: "files:files:get_file_nodes",
  description:
    "Get file JSON for specific nodes. Returns the nodes referenced to by `ids` as a JSON object. The nodes are retrieved from the Figma file referenced to by `file_key`.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to export JSON from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      ids: {
        type: "string",
        description: "A comma separated list of node IDs to retrieve and convert.",
      },
      version: {
        type: "string",
        description: "A specific version ID to get. Omitting this will get the current version of the file.",
      },
      depth: {
        type: "number",
        description:
          "Positive integer representing how deep into the node tree to traverse. For example, setting this to 1 will return only the children directly underneath the desired nodes. Not setting this parameter returns all nodes.",
      },
      geometry: {
        type: "string",
        description: 'Set to "paths" to export vector data.',
      },
      plugin_data: {
        type: "string",
        description:
          'A comma separated list of plugin IDs and/or the string "shared". Any data present in the document written by those plugins will be included in the result in the `pluginData` and `sharedPluginData` properties.',
      },
    },
    required: ["file_key", "ids"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}/nodes",
    query: ["ids", "version", "depth", "geometry", "plugin_data"],
  },
});
