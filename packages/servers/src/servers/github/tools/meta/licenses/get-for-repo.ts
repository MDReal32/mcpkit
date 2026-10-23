import { defineTool } from "@usemcpkit/core";

export const metaLicensesGetForRepo = defineTool({
  name: "meta:licenses:get_for_repo",
  description:
    "Get the license for a repository. This method returns the contents of the repository's license file, if one is detected.",
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
        description:
          "The Git reference for the results you want to list. The `ref` for a branch can be formatted either as `refs/heads/<branch name>` or simply `<branch name>`. To reference a pull request use `refs/pull/<number>/merge`.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "GET",
    path: "/repos/{owner}/{repo}/license",
    query: ["ref"],
  },
});
