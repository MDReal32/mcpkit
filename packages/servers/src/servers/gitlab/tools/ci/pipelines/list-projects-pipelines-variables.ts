import { defineTool } from "@usemcpkit/core";

export const ciPipelinesListProjectsPipelinesVariables = defineTool({
  name: "ci:pipelines:list_projects_pipelines_variables",
  description: "List all pipeline variables. Lists all pipeline variables for a specified pipeline.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      pipeline_id: {
        type: "integer",
        description: "ID of the pipeline.",
      },
    },
    required: ["id", "pipeline_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/pipelines/{pipeline_id}/variables",
  },
});
