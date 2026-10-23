import { defineTool } from "@usemcpkit/core";

export const cloudV1TemplateRemoveTemplate = defineTool({
  name: "cloud_v1:template:remove_template",
  description:
    "[Cloud v1] Remove template. Deletes a template. This results in different actions depending on the type of template:",
  input: {
    type: "object",
    properties: {
      contentTemplateId: {
        type: "string",
        description: "The ID of the template to be deleted.",
      },
    },
    required: ["contentTemplateId"],
  },
  request: {
    method: "DELETE",
    path: "/wiki/rest/api/template/{contentTemplateId}",
  },
});
