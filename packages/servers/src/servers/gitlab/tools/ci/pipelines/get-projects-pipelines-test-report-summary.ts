import { defineTool } from "@usemcpkit/core";

export const ciPipelinesGetProjectsPipelinesTestReportSummary = defineTool({
  name: "ci:pipelines:get_projects_pipelines_test_report_summary",
  description: "Retrieve a test report summary for a pipeline. Retrieves a test report summary for a pipeline.",
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
    path: "/projects/{id}/pipelines/{pipeline_id}/test_report_summary",
  },
});
