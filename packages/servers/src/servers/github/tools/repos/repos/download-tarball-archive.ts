import { defineTool } from "@usemcpkit/core";

export const reposReposDownloadTarballArchive = defineTool({
  name: "repos:repos:download_tarball_archive",
  description:
    "Download a repository archive (tar). Gets a redirect URL to download a tar archive for a repository. If you omit `:ref`, the repository’s default branch (usually `main`) will be used. Please make sure your HTTP framework is configured to follow redirects or you will need to use the `Location` header to make a second `GET` request.",
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
      ref: {
        type: "string",
      },
    },
    required: ["owner", "repo", "ref"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/tarball/{ref}",
  },
});
