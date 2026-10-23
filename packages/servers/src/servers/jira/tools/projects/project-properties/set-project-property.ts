import { defineTool } from "@usemcpkit/core";

export const projectsProjectPropertiesSetProjectProperty = defineTool({
  name: "projects:project_properties:set_project_property",
  description:
    "Set project property. Sets the value of the project property. You can use project properties to store custom data against the project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "The project ID or project key (case sensitive).",
      },
      propertyKey: {
        type: "string",
        description: "The key of the project property. The maximum length is 255 characters.",
      },
      body: {},
    },
    required: ["projectIdOrKey", "propertyKey", "body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/project/{projectIdOrKey}/properties/{propertyKey}",
    bodyArg: "body",
  },
});
