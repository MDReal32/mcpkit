import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflows = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows",
  description: "Create a flow. Creates and starts a flow.",
  input: {
    type: "object",
    properties: {
      project_id: {
        type: "string",
        description: "ID or path of the project to associate the flow with.",
      },
      namespace_id: {
        type: "string",
        description: "ID or path of the namespace to associate the flow with.",
      },
      ai_catalog_item_consumer_id: {
        type: "integer",
        description: "The ID of AI Catalog ItemConsumer that configures which catalog item to execute.",
      },
      start_workflow: {
        type: "boolean",
        description: "When true, starts the flow after creating it.",
      },
      goal: {
        type: "string",
        description: "Description of the task for the agent to complete, for example `Fix the failing pipeline`.",
      },
      agent_privileges: {
        type: "array",
        description: "The actions the agent is allowed to perform",
        items: {
          type: "integer",
        },
      },
      pre_approved_agent_privileges: {
        type: "array",
        description:
          "Privilege IDs the agent can use without asking for user approval. Must be a subset of `agent_privileges`.",
        items: {
          type: "integer",
        },
      },
      workflow_definition: {
        type: "string",
        description: "workflow type based on its capability",
      },
      allow_agent_to_request_user: {
        type: "boolean",
        description:
          "If `true`, the agent may pause to ask the user questions before proceeding. If `false`, the agent runs to completion without user input. Defaults to `true`.",
      },
      image: {
        type: "string",
        description: "Container image to use for the flow. Applies only when the flow runs in a CI pipeline.",
      },
      source_branch: {
        type: "string",
        description:
          "Source branch for the flow. When not specified, a flow whose goal names a pipeline or merge request, such as fix_pipeline/v1, uses its branch, and other flows use the default branch. Applies only when the flow runs in a CI pipeline.",
      },
      environment: {
        type: "string",
        description: "Execution environment for the workflow.",
        enum: ["ide", "web", "chat_partial", "chat", "ambient"],
      },
      ai_catalog_item_version_id: {
        type: "integer",
        description: "ID of the AI Catalog item version that sourced the flow configuration used by the workflow.",
      },
      additional_context: {
        type: "array",
        description:
          "Additional context for the flow. Each element is an object with at least `Category` and `Content` keys. `Content` is a JSON-serialized string.",
        items: {
          type: "object",
          properties: {
            Category: {
              type: "string",
              description: "Category of the context detail.",
            },
            Content: {
              type: "string",
              description: "Content of the context detail.",
            },
          },
          required: ["Category", "Content"],
        },
      },
      issue_id: {
        type: "integer",
        description: "Internal ID of the issue to associate the flow with. Requires `project_id`.",
      },
      merge_request_id: {
        type: "integer",
        description: "Internal ID of the merge request to associate the flow with. Requires `project_id`.",
      },
      source: {
        type: "string",
        description: "Where the session was triggered from in the UI.",
        enum: [
          "merge_request_code_conflict",
          "merge_request_dependency_bump",
          "merge_request_fix_pipeline",
          "merge_request_resolve_discussion",
          "work_item_to_merge_request",
          "fix_pipeline",
          "convert_platform_ci_pipeline",
          "duo_cli_interactive",
          "duo_cli_run",
          "duo_cli_acp",
          "ide_extension",
          "work_item_plan_to_merge_request",
          "web_chat",
        ],
      },
    },
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/workflows",
    body: [
      "project_id",
      "namespace_id",
      "ai_catalog_item_consumer_id",
      "start_workflow",
      "goal",
      "agent_privileges",
      "pre_approved_agent_privileges",
      "workflow_definition",
      "allow_agent_to_request_user",
      "image",
      "source_branch",
      "environment",
      "ai_catalog_item_version_id",
      "additional_context",
      "issue_id",
      "merge_request_id",
      "source",
    ],
  },
});
