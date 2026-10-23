import { defineTool } from "@usemcpkit/core";

export const securityVulnerabilitiesCreateVulnerabilitiesFlagsAiDetection = defineTool({
  name: "security:vulnerabilities:create_vulnerabilities_flags_ai_detection",
  description:
    "Update AI False Positive Detection results. Updates the confidence score and explanation for AI-based False Positive Detection flows.",
  input: {
    type: "object",
    properties: {
      vulnerability_id: {
        type: "string",
        description: "ID of the vulnerability.",
      },
      confidence_score: {
        type: "integer",
        description: "Confidence score for the AI-detected vulnerability flag.",
      },
      description: {
        type: "string",
        description: "Explanation for the detection result.",
      },
      origin: {
        type: "string",
        description: "Origin of the AI detection.",
      },
    },
    required: ["vulnerability_id", "confidence_score", "description"],
  },
  request: {
    method: "POST",
    path: "/vulnerabilities/{vulnerability_id}/flags/ai_detection",
    body: ["confidence_score", "description", "origin"],
  },
});
