import { defineTool } from "@usemcpkit/core";

export const filesFilesGetFile = defineTool({
  name: "files:files:get_file",
  description:
    "Get file JSON. Returns the document identified by `file_key` as a JSON object. The file key can be parsed from any Figma file url: `https://www.figma.com/file/{file_key}/{title}`.",
  input: {
    type: "object",
    properties: {
      file_key: {
        type: "string",
        description:
          "File to export JSON from. This can be a file key or branch key. Use `GET /v1/files/:key` with the `branch_data` query param to get the branch key.",
      },
      version: {
        type: "string",
        description: "A specific version ID to get. Omitting this will get the current version of the file.",
      },
      ids: {
        type: "string",
        description:
          "Comma separated list of nodes that you care about in the document. If specified, only a subset of the document will be returned corresponding to the nodes listed, their children, and everything between the root node and the listed nodes.",
      },
      depth: {
        type: "number",
        description:
          "Positive integer representing how deep into the document tree to traverse. For example, setting this to 1 returns only Pages, setting it to 2 returns Pages and all top level objects on each page. Not setting this parameter returns all nodes.",
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
      branch_data: {
        type: "boolean",
        default: false,
        description:
          "Returns branch metadata for the requested file. If the file is a branch, the main file's key will be included in the returned response. If the file has branches, their metadata will be included in the returned response. Default: false.",
      },
    },
    required: ["file_key"],
  },
  request: {
    method: "GET",
    path: "/v1/files/{file_key}",
    query: ["version", "ids", "depth", "geometry", "plugin_data", "branch_data"],
  },
});
