import { defineTool } from "@usemcpkit/core";

export const projectsProjectTemplatesEditTemplate = defineTool({
  name: "projects:project_templates:edit_template",
  description: "Edit a custom project template. Edit custom template",
  input: {
    type: "object",
    properties: {
      templateDescription: {
        type: "string",
        description: "The description of the template",
      },
      templateGenerationOptions: {
        type: "object",
        properties: {
          enableScreenDelegatedAdminSupport: {
            type: "boolean",
            description:
              "Enable screen delegated admin support for the template. This means screen and associated schemes will be copied rather than referenced.",
          },
          enableWorkflowDelegatedAdminSupport: {
            type: "boolean",
            description:
              "Enable workflow delegated admin support for the template. This means workflows and workflow schemes will be copied rather than referenced.",
          },
        },
      },
      templateKey: {
        type: "string",
        description: "The unique identifier of the template",
      },
      templateName: {
        type: "string",
        description: "The name of the template",
      },
    },
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/project-template/edit-template",
    body: ["templateDescription", "templateGenerationOptions", "templateKey", "templateName"],
  },
});
