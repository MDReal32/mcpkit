import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoCreateDuoCodeReviewEvaluations = defineTool({
  name: "ai:gitlab_duo:create_duo_code_review_evaluations",
  description: "Evaluate code review. Evaluates code changes using GitLab Duo code review",
  input: {
    type: "object",
    properties: {
      diffs: {
        type: "string",
        description: "Raw diffs to review.",
      },
      mr_title: {
        type: "string",
        description: "Title of the merge request.",
      },
      mr_description: {
        type: "string",
        description: "Description of the merge request.",
      },
      files_content: {
        type: "object",
        description: "Full file contents, where keys are file paths and values are the file contents.",
      },
    },
    required: ["diffs", "mr_title", "mr_description", "files_content"],
  },
  request: {
    method: "POST",
    path: "/duo_code_review/evaluations",
    body: ["diffs", "mr_title", "mr_description", "files_content"],
  },
});
