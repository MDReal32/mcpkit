import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningUpdateAiScanEnablement = defineTool({
  name: "security:code_scanning:update_ai_scan_enablement",
  description: "Update AI Scan enablement for a repository. Updates whether AI Scan is enabled for a repository.",
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
      pr_scan: {
        type: "string",
        description: "Whether to enable or disable AI Scan for the repository.",
        enum: ["enabled", "disabled"],
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "PATCH",
    path: "/repos/{owner}/{repo}/code-scanning/ai-scan",
    body: ["pr_scan"],
  },
});
