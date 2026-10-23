import { defineTool } from "@usemcpkit/core";

export const ciPipelinesUpdateProjectsPipelinesMetadata = defineTool({
  name: "ci:pipelines:update_projects_pipelines_metadata",
  description:
    "Update pipeline metadata. Updates pipeline metadata. The metadata contains the name of the pipeline. This feature was introduced in GitLab 16.6.",
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
      name: {
        type: "string",
        description: "New name of the pipeline.",
      },
    },
    required: ["id", "pipeline_id", "name"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/pipelines/{pipeline_id}/metadata",
    body: ["name"],
  },
});
