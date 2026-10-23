import { defineTool } from "@usemcpkit/core";

export const securityCodeScanningDeleteAnalysis = defineTool({
  name: "security:code_scanning:delete_analysis",
  description:
    "Delete a code scanning analysis from a repository. Deletes a specified code scanning analysis from a repository.",
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
      analysis_id: {
        type: "integer",
        description:
          "The ID of the analysis, as returned from the `GET /repos/{owner}/{repo}/code-scanning/analyses` operation.",
      },
      confirm_delete: {
        type: "string",
        description:
          "Allow deletion if the specified analysis is the last in a set. If you attempt to delete the final analysis in a set without setting this parameter to `true`, you'll get a 400 response with the message: `Analysis is last of its type and deletion may result in the loss of historical alert data. Please specify confirm_delete.`",
      },
    },
    required: ["owner", "repo", "analysis_id"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}",
    query: ["confirm_delete"],
  },
});
