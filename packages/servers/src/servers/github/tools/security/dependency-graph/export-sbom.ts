import { defineTool } from "@usemcpkit/core";

export const securityDependencyGraphExportSbom = defineTool({
  name: "security:dependency_graph:export_sbom",
  description:
    '[Deprecated] Export a software bill of materials (SBOM) for a repository. > [!WARNING] > **Closing down notice:** This operation is closing down and will not be accessible after November 13, 2026. Please migrate to the asynchronous flow. Use "Request generation of a software bill of materials (SBOM) for a repository" to trigger the report, then "Fetch a software bill of materials (SBOM) for a repository" to retrieve it. For more information, see the changelog.',
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
    path: "/repos/{owner}/{repo}/dependency-graph/sbom",
  },
});
