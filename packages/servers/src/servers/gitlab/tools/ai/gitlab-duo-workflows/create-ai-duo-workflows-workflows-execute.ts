import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsWorkflowsExecute = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_workflows_execute",
  description:
    "Request Duo Workflows server-side execution connection details. Workhorse pre-authorization endpoint. Returns the connection details Workhorse needs to run the flow itself over gRPC and stream the actions it receives back to the caller, for callers that cannot execute actions of their own. Requests must arrive through Workhorse.",
  input: {
    type: "object",
    properties: {
      workflow_id: {
        type: "string",
        description: "The ID of the workflow to execute",
      },
      project_id: {
        type: "string",
        description: "ID or path of the project to associate the flow with.",
      },
      namespace_id: {
        type: "string",
        description: "ID or path of the namespace to associate the flow with.",
      },
      root_namespace_id: {
        type: "string",
        description: "The ID of the root namespace",
      },
      ai_catalog_item_version_id: {
        type: "integer",
        description: "The ID of the AI Catalog ItemVersion that sourced the flow config used by the workflow.",
      },
      client_type: {
        type: "string",
        description: "The type of client starting the session",
      },
      user_selected_model_identifier: {
        type: "string",
        description: "Identifier of the model the user selected for this session",
      },
      detached: {
        type: "boolean",
        description:
          "When true, asks Workhorse to answer once the run has started and keep it going after the request ends.",
      },
    },
    required: ["workflow_id"],
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/workflows/{workflow_id}/execute",
    body: [
      "project_id",
      "namespace_id",
      "root_namespace_id",
      "ai_catalog_item_version_id",
      "client_type",
      "user_selected_model_identifier",
      "detached",
    ],
  },
});
