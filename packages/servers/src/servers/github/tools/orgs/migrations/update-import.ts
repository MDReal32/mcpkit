import { defineTool } from "@usemcpkit/core";

export const orgsMigrationsUpdateImport = defineTool({
  name: "orgs:migrations:update_import",
  description:
    "[Deprecated] Update an import. An import can be updated with credentials or a project choice by passing in the appropriate parameters in this API request. If no parameters are provided, the import will be restarted.",
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
      vcs_username: {
        type: "string",
        description: "The username to provide to the originating repository.",
      },
      vcs_password: {
        type: "string",
        description: "The password to provide to the originating repository.",
      },
      vcs: {
        type: "string",
        description: "The type of version control system you are migrating from.",
        enum: ["subversion", "tfvc", "git", "mercurial"],
      },
      tfvc_project: {
        type: "string",
        description: "For a tfvc import, the name of the project that is being imported.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/import",
    body: ["vcs_username", "vcs_password", "vcs", "tfvc_project"],
  },
});
