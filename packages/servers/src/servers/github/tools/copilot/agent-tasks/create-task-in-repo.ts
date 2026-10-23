import { defineTool } from "@usemcpkit/core";

export const copilotAgentTasksCreateTaskInRepo = defineTool({
  name: "copilot:agent_tasks:create_task_in_repo",
  description: "Start a task. > [!NOTE] > This endpoint is in public preview and is subject to change.",
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
      prompt: {
        type: "string",
        description: "The user's prompt for the agent",
      },
      model: {
        type: "string",
        description:
          "The model to use for this task. The allowed models may change over time and depend on the user's GitHub Copilot plan and organization policies. Currently supported values: `claude-sonnet-4.6`, `claude-opus-4.6`, `gpt-5.2-codex`, `gpt-5.3-codex`, `gpt-5.4`, `claude-sonnet-4.5`, `claude-opus-4.5`",
      },
      custom_agent: {
        type: "string",
        description:
          "Optional identifier for a custom agent to use for this task. Use the custom agent's filename without the extension - for example, for a `.github/agents/performance-optimizer.agent.md` custom agent, use `performance-optimizer`.",
      },
      create_pull_request: {
        type: "boolean",
        description: "Whether to create a PR.",
        default: false,
      },
      base_ref: {
        type: "string",
        description: "Base ref for new branch/PR",
      },
      head_ref: {
        type: "string",
        description:
          "Head ref for existing branch/PR. If provided with `base_ref`, the agent looks up open PR context for `head_ref` targeting `base_ref` and commits to `head_ref` instead of creating a new branch.",
      },
    },
    required: ["owner", "repo", "prompt"],
  },
  request: {
    method: "POST",
    path: "/agents/repos/{owner}/{repo}/tasks",
    body: ["prompt", "model", "custom_agent", "create_pull_request", "base_ref", "head_ref"],
  },
});
