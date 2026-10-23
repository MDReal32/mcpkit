import { defineTool } from "@usemcpkit/core";

export const ciPipelinesDeleteProjectsPipelines = defineTool({
  name: "ci:pipelines:delete_projects_pipelines",
  description: "Delete a pipeline. Deletes a specified pipeline for a project.",
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
    method: "DELETE",
    path: "/projects/{id}/pipelines/{pipeline_id}",
  },
});
