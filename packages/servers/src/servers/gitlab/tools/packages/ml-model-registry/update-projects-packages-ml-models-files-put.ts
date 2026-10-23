import { defineTool } from "@usemcpkit/core";

export const packagesMlModelRegistryUpdateProjectsPackagesMlModelsFilesPut = defineTool({
  name: "packages:ml_model_registry:update_projects_packages_ml_models_files_put",
  description: "Workhorse upload model package file. Introduced in GitLab 16.8",
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
      path: {
        type: "string",
        description: "File directory path",
      },
      model_version_id: {
        type: "string",
        description: "Model version id",
      },
      status: {
        type: "string",
        description: "Package status",
        enum: ["default", "hidden"],
      },
      file: {
        type: "string",
        description: "Path of a local file to upload.",
      },
    },
    required: ["id", "file_name", "path", "model_version_id", "file"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/packages/ml_models/{model_version_id}/files/{path}/{file_name}",
    body: ["status", "file"],
    contentType: "multipart/form-data",
    fileArgs: ["file"],
  },
});
