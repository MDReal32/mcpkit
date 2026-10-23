import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsRevokeToken = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_revoke_token",
  description: "Revoke ai_workflows token. Revokes an active Duo Workflows authentication token.",
  input: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description: "Access token to revoke.",
      },
    },
    required: ["token"],
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/revoke_token",
    body: ["token"],
  },
});
