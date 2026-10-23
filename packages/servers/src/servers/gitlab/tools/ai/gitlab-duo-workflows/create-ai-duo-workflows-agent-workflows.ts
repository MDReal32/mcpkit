import { defineTool } from '@usemcpkit/core';

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsAgentWorkflows = defineTool({
  name: 'ai:gitlab_duo_workflows:create_ai_duo_workflows_agent_workflows',
  description:
    'Create workflow persistence (agent-initiated, limited privileges). Accessible via ai_workflows scope token. Does not accept agent_privileges or pre_approved_agent_privileges.',
  input: {
    type: 'object',
    properties: {
      project_id: {
        type: 'string',
        description: 'ID or path of the project to associate the flow with.',
      },
      namespace_id: {
        type: 'string',
        description: 'ID or path of the namespace to associate the flow with.',
      },
      ai_catalog_item_consumer_id: {
        type: 'integer',
        description:
          'ID of the AI Catalog item consumer that determines which catalog item to run. Requires `project_id`. If `workflow_definition` is also provided, `ai_catalog_item_consumer_id` takes precedence.',
      },
      start_workflow: {
        type: 'boolean',
        description: 'If `true`, starts the workflow in a CI pipeline. This feature is experimental.',
      },
      goal: {
        type: 'string',
        description: 'Goal of the workflow.',
      },
      workflow_definition: {
        type: 'string',
        description: 'Workflow type based on its capability.',
      },
      allow_agent_to_request_user: {
        type: 'boolean',
        description:
          'If `true`, Duo Agent Platform may stop to ask the user questions before proceeding. If `false`, Duo Agent Platform runs through the workflow without asking for user input. Defaults to `true`.',
      },
      image: {
        type: 'string',
        description: 'Container image to use for running the workflow in CI pipeline.',
      },
      source_branch: {
        type: 'string',
        description: "Source branch for the CI pipeline. Defaults to the project's default branch.",
      },
      environment: {
        type: 'string',
        description: 'Environment for the workflow.',
        enum: ['ide', 'web', 'chat_partial', 'chat', 'ambient', 'external'],
      },
      ai_catalog_item_version_id: {
        type: 'integer',
        description: 'ID of the AI Catalog item version that sourced the flow configuration used by the workflow.',
      },
      additional_context: {
        type: 'array',
        description:
          'Additional context for the flow. Each element is an object with at least `Category` and `Content` keys. `Content` is a JSON-serialized string.',
        items: {
          type: 'object',
          properties: {
            Category: {
              type: 'string',
              description: 'Category of the context detail.',
            },
            Content: {
              type: 'string',
              description: 'Content of the context detail.',
            },
          },
          required: ['Category', 'Content'],
        },
      },
      issue_id: {
        type: 'integer',
        description: 'Internal ID of the issue that the workflow is associated with. Requires `project_id`.',
      },
      merge_request_id: {
        type: 'integer',
        description: 'Internal ID of the merge request that the workflow is associated with. Requires `project_id`.',
      },
    },
  },
  request: {
    method: 'POST',
    path: '/ai/duo_workflows/agent_workflows',
    body: [
      'project_id',
      'namespace_id',
      'ai_catalog_item_consumer_id',
      'start_workflow',
      'goal',
      'workflow_definition',
      'allow_agent_to_request_user',
      'image',
      'source_branch',
      'environment',
      'ai_catalog_item_version_id',
      'additional_context',
      'issue_id',
      'merge_request_id',
    ],
  },
});
