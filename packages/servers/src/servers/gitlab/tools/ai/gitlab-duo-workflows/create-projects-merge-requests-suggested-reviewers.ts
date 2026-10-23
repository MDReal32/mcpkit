import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateProjectsMergeRequestsSuggestedReviewers = defineTool({
  name: "ai:gitlab_duo_workflows:create_projects_merge_requests_suggested_reviewers",
  description:
    "Set the AI-recommended reviewers for a merge request. Replaces the AI-recommended reviewers persisted for a specified merge request. Available only when the recommend reviewers flow is enabled for the project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID or URL-encoded path of the project.",
      },
      merge_request_iid: {
        type: "integer",
        description: "The internal ID of the merge request.",
      },
      suggestions: {
        type: "array",
        description: "Recommended reviewers (maximum is 50).",
        items: {
          type: "object",
          properties: {
            user_id: {
              type: "integer",
              description: "ID of the recommended user.",
            },
            reason: {
              type: "string",
              description: "Model rationale for the recommendation (maximum 2048 characters).",
            },
            approval_rule_id: {
              type: "integer",
              description: "ID of the approval rule the user was suggested for.",
            },
            approval_rule_type: {
              type: "string",
              description: "Type of the approval rule the user was suggested for.",
              enum: ["merge_request_rule", "project_rule"],
            },
          },
          required: ["user_id", "approval_rule_type"],
        },
      },
    },
    required: ["id", "merge_request_iid", "suggestions"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/merge_requests/{merge_request_iid}/suggested_reviewers",
    body: ["suggestions"],
  },
});
