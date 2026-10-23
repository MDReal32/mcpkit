import { defineTool } from "@usemcpkit/core";

export const reposReposUploadReleaseAsset = defineTool({
  name: "repos:repos:upload_release_asset",
  description:
    "Upload a release asset. This endpoint makes use of a Hypermedia relation to determine which URL to access. The endpoint you call to upload release assets is specific to your release. Use the `upload_url` returned in the response of the Create a release endpoint to upload a release asset.",
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
      release_id: {
        type: "integer",
        description: "The unique identifier of the release.",
      },
      name: {
        type: "string",
      },
      label: {
        type: "string",
      },
      body: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["owner", "repo", "release_id", "name"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/releases/{release_id}/assets",
    query: ["name", "label"],
    bodyArg: "body",
    contentType: "application/octet-stream",
    fileArgs: ["body"],
  },
});
