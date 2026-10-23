import { defineTool } from "@usemcpkit/core";

export const projectsProjectVersionsGetVersionRelatedIssues = defineTool({
  name: "projects:project_versions:get_version_related_issues",
  description: "Get version's related issues count. Returns the following counts for a version:",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the version.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/version/{id}/relatedIssueCounts",
  },
});
