import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsListAiDuoWorkflowsWorkflowsAgentPrivileges = defineTool({
  name: "ai:gitlab_duo_workflows:list_ai_duo_workflows_workflows_agent_privileges",
  description:
    "List all agent privileges. Lists all available agent privileges with their IDs, names, descriptions, and whether each is enabled by default. This endpoint has no supported attributes.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/ai/duo_workflows/workflows/agent_privileges",
  },
});
