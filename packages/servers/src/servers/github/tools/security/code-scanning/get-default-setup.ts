import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningGetDefaultSetup = defineTool({
  name: "security:code_scanning:get_default_setup",
  description: "Get a code scanning default setup configuration. Gets a code scanning default setup configuration.",
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
    path: "/repos/{owner}/{repo}/code-scanning/default-setup",
  },
});
