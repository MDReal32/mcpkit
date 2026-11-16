import { defineTool } from "@usemcpkit/core";

/** The description answers a release asset's metadata as JSON; asked for octet-stream, it answers the file itself. */
export const getReleaseAsset = defineTool({
  name: "repos/{owner}/{repo}/releases/assets/{asset_id}:get",
  description: "Download a release asset: saves the asset's file to a local path.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      asset_id: {
        type: "integer",
        description: "The unique identifier of the asset.",
      },
      save_to: {
        type: "string",
        description: "Local path the downloaded file is saved to.",
      },
    },
    required: ["owner", "repo", "asset_id", "save_to"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/releases/assets/{asset_id}",
    saveToArg: "save_to",
    fixedHeaders: {
      Accept: "application/octet-stream",
    },
  },
});
