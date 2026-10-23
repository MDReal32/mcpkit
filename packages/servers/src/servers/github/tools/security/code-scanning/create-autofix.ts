import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningCreateAutofix = defineTool({
  name: "security:code_scanning:create_autofix",
  description:
    "Create an autofix for a code scanning alert. Creates an autofix for a code scanning alert from the repository's default branch.",
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
      alert_number: {
        type: "integer",
        description:
          "The number that identifies an alert. You can find this at the end of the URL for a code scanning alert within GitHub, and in the `number` field in the response from the `GET /repos/{owner}/{repo}/code-scanning/alerts` operation.",
      },
    },
    required: ["owner", "repo", "alert_number"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix",
  },
});
