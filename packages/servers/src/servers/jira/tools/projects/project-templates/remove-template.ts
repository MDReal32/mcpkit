import { defineTool } from "@usemcpkit/core";

export const projectsProjectTemplatesRemoveTemplate = defineTool({
  name: "projects:project_templates:remove_template",
  description: "Deletes a custom project template. Remove custom template",
  input: {
    type: "object",
    properties: {
      templateKey: {
        type: "string",
        description: "The \\{@link String\\} containing the key of the custom template to remove",
      },
    },
    required: ["templateKey"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/project-template/remove-template",
    query: ["templateKey"],
  },
});
