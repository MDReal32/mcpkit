import { defineTool } from "@usemcpkit/core";

export const packagesMlModelRegistryGetProjectsPackagesMlModelsFiles = defineTool({
  name: "packages:ml_model_registry:get_projects_packages_ml_models_files",
  description: "Download an ml_model package file. This feature was introduced in GitLab 16.8",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID or URL-encoded path of the project",
      },
      file_name: {
        type: "string",
        description: "File name",
      },
      model_version_id: {
        type: "string",
        description: "Model version id",
      },
      status: {
        type: "string",
        enum: ["default", "hidden"],
        description: "Package status",
      },
    },
    required: ["id", "file_name", "model_version_id"],
  },
  request: {
    method: "GET",
    path: "/projects/{id}/packages/ml_models/{model_version_id}/files/{file_name}",
    query: ["status"],
  },
});
