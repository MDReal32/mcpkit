import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsResume = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_resume",
  description: "Resume a paused workflow. Resumes execution of a previously paused workflow.",
  input: {
    type: "object",
    properties: {
      workflow_id: {
        type: "string",
        description: "ID of the workflow to resume.",
      },
      human_approval: {
        type: "boolean",
        description: "If `true`, the human approves resuming the workflow.",
      },
      human_message: {
        type: "string",
        description: "Message accompanying the human decision.",
      },
    },
    required: ["workflow_id", "human_approval"],
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/workflows/{workflow_id}/resume",
    body: ["human_approval", "human_message"],
  },
});
