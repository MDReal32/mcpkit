import { defineTool } from "@usemcpkit/core";

export const instanceSourceControlPushSourceControl = defineTool({
  name: "instance:source_control:push_source_control",
  description:
    "Push local source control changes. Commits and pushes the selected files to the connected Git branch. Each entry in `fileNames` is resolved against a fresh preview of the pending changes.",
  input: {
    type: "object",
    properties: {
      commitMessage: {
        type: "string",
      },
      fileNames: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: {
              type: "string",
            },
            type: {
              type: "string",
              enum: ["credential", "workflow", "tags", "variables", "file", "folders", "project", "datatable"],
            },
          },
          required: ["id", "type"],
        },
      },
      force: {
        type: "boolean",
      },
    },
    required: ["commitMessage", "fileNames"],
  },
  request: {
    method: "POST",
    path: "/source-control/push",
    body: ["commitMessage", "fileNames", "force"],
  },
});
