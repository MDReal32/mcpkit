import { defineTool } from "@usemcpkit/core";

export const instanceSourceControlPullSourceControl = defineTool({
  name: "instance:source_control:pull_source_control",
  description:
    "Pull changes from the remote repository. Fetches changes from the connected Git branch into the instance.",
  input: {
    type: "object",
    properties: {
      force: {
        type: "boolean",
        description: "Discard local changes and force the pull to complete.",
      },
      autoPublish: {
        type: "string",
        description:
          "Controls automatic workflow publishing after import: - `none`: Keep workflows in their local published state (default) - `all`: Publish all imported workflows - `published`: Publish only workflows that were published locally before import",
        default: "none",
        enum: ["none", "all", "published"],
      },
    },
  },
  request: {
    method: "POST",
    path: "/source-control/pull",
    body: ["force", "autoPublish"],
  },
});
