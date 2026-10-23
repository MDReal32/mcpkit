import { defineTool } from "@usemcpkit/core";

export const projectsProjectClassificationLevelsGetProjectClassificationConfig = defineTool({
  name: "projects:project_classification_levels:get_project_classification_config",
  description:
    "Get the classification configuration for a project. Returns the consolidated classification configuration for a project's admin settings page.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case-sensitive).",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/project/{projectIdOrKey}/classification-config",
  },
});
