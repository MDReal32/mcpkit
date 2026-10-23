import { defineTool } from "@usemcpkit/core";

export const aiGitlabDuoWorkflowsCreateAiDuoWorkflowsDirectAccess = defineTool({
  name: "ai:gitlab_duo_workflows:create_ai_duo_workflows_direct_access",
  description:
    "Connection details for accessing Duo Agent Platform Service directly. Returns connection details for direct access to the Duo Agent Platform Service.",
  input: {
    type: "object",
    properties: {
      workflow_definition: {
        type: "string",
        description: "workflow type based on its capability",
      },
      root_namespace_id: {
        type: "string",
        description: "ID of the root namespace.",
      },
      project_id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
    },
  },
  request: {
    method: "POST",
    path: "/ai/duo_workflows/direct_access",
    body: ["workflow_definition", "root_namespace_id", "project_id"],
  },
});
