import { defineTool } from "@usemcpkit/core";

export const projectsProjectClassificationLevelsGetDefaultProjectClassification = defineTool({
  name: "projects:project_classification_levels:get_default_project_classification",
  description:
    "Get the default data classification level of a project. Returns the default data classification for a project.",
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
    path: "/rest/api/2/project/{projectIdOrKey}/classification-level/default",
  },
});
