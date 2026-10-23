import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsToolsRiskAssessmentResults = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_tools_risk_assessment_results",
  description:
    "Submit risk assessment results for a merge request. Submits the categorical claims and summary produced by the risk assessment tool.",
  input: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "The ID or path of the project",
      },
      merge_request_iid: {
        type: "integer",
        description: "The IID of the merge request",
      },
      diff_sha: {
        type: "string",
        description: "The full SHA of the diff revision the claims were assessed against",
      },
      workflow_id: {
        type: "integer",
        description: "ID of the Duo workflow session that produced these claims",
      },
      claims: {
        type: "array",
        description: "Categorical claims about the merge request",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the claim, for example authorization",
            },
            value: {
              type: "string",
              description: "Categorical answer, for example true, false, or behavioral. Never a score.",
            },
            evidence: {
              type: "string",
              description: "Where the claim was observed, as a path:line reference",
            },
          },
          required: ["name", "value"],
        },
      },
      summary: {
        type: "string",
        description: "Plain-language explanation of the change and where its risk lies",
      },
    },
    required: ["project_id", "merge_request_iid", "diff_sha", "workflow_id", "claims"],
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/tools/risk_assessment/results",
    body: ["project_id", "merge_request_iid", "diff_sha", "workflow_id", "claims", "summary"],
  },
});
