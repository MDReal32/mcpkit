import { defineTool } from "@usemcpkit/core";

export const securitySoftwareCompositionAnalysisCreateJobsSbomScans = defineTool({
  name: "security:software_composition_analysis:create_jobs_sbom_scans",
  description: "Upload an SBOM file. Uploads an SBOM file to be scanned for a specified job.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "ID of the job.",
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
      sbom_digest: {
        type: "string",
        description: "Digest corresponding to uploaded SBOM",
      },
    },
    required: ["id", "file"],
  },
  request: {
    method: "POST",
    path: "/jobs/{id}/sbom_scans",
    body: ["file", "sbom_digest"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
