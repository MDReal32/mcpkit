import { defineTool } from "@usemcpkit/core";

export const copilotAgentAutomationsDeleteRepoAutomation = defineTool({
  name: "copilot:agent_automations:delete_repo_automation",
  description: "Delete an automation for a repository. Deletes an automation in a repository.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository. The name is not case sensitive.",
      },
      automation_id: {
        type: "string",
        description: "The unique identifier of the automation.",
      },
    },
    required: ["owner", "repo", "automation_id"],
  },
  request: {
    method: "DELETE",
    path: "/agents/repos/{owner}/{repo}/automations/{automation_id}",
  },
});
