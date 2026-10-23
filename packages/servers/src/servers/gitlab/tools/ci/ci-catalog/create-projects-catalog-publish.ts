import { defineTool } from "@usemcpkit/core";

export const ciCiCatalogCreateProjectsCatalogPublish = defineTool({
  name: "ci:ci_catalog:create_projects_catalog_publish",
  description:
    "Publish a new component project release as version to the CI/CD catalog. Publishes a release of a catalog resource as version to the CI/CD catalog.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      metadata: {
        type: "object",
        description: "Metadata for the release.",
      },
    },
    required: ["id", "metadata"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/catalog/publish",
    body: ["metadata"],
  },
});
