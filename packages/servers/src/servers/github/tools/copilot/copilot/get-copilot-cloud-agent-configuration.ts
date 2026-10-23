import { defineTool } from "@usemcpkit/core";

export const copilotCopilotGetCopilotCloudAgentConfiguration = defineTool({
  name: "copilot:copilot:get_copilot_cloud_agent_configuration",
  description:
    "Get Copilot cloud agent configuration for a repository. > [!NOTE] > This endpoint is in public preview and is subject to change.",
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
    path: "/repos/{owner}/{repo}/copilot/cloud-agent/configuration",
  },
});
