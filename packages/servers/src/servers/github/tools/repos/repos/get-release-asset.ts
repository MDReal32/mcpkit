import { defineTool } from "@usemcpkit/core";

export const reposReposGetReleaseAsset = defineTool({
  name: "repos:repos:get_release_asset",
  description: "Get a release asset. To download the asset's binary content:",
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
