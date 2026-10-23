import { defineTool } from "@usemcpkit/core";

export const fieldsFieldSchemesAssociateProjectsToFieldAssociationSchemes = defineTool({
  name: "fields:field_schemes:associate_projects_to_field_association_schemes",
  description: "Associate projects to field schemes. Associate projects to field association schemes.",
  input: {
    type: "object",
    properties: {
      body: {
        type: "object",
      },
    },
    required: ["body"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/config/fieldschemes/projects",
    bodyArg: "body",
  },
});
