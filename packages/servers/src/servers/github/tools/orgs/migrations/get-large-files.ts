import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsGetLargeFiles = defineTool({
  name: "orgs:migrations:get_large_files",
  description: "[Deprecated] Get large files. List files larger than 100MB found during the import",
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
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/import/large_files",
  },
});
