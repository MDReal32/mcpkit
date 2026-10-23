import { defineTool } from "@usemcpkit/core";

export const projectsProjectPropertiesDeleteProjectProperty = defineTool({
  name: "projects:project_properties:delete_project_property",
  description: "Delete project property. Deletes the property from a project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      propertyKey: {
        type: "string",
        description:
          "The project property key. Use Get project property keys to get a list of all project property keys.",
      },
    },
    required: ["projectIdOrKey", "propertyKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/project/{projectIdOrKey}/properties/{propertyKey}",
  },
});
