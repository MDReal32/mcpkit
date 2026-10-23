import { defineTool } from "@usemcpkit/core";

export const projectsProjectVersionsDeleteAndReplaceVersion = defineTool({
  name: "projects:project_versions:delete_and_replace_version",
  description: "Delete and replace version. Deletes a project version.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the version.",
      },
      customFieldReplacementList: {
        type: "array",
        description:
          "An array of custom field IDs (`customFieldId`) and version IDs (`moveTo`) to update when the fields contain the deleted version.",
        items: {
          type: "object",
          description: "Details about the replacement for a deleted version.",
          properties: {
            customFieldId: {
              type: "integer",
              description: "The ID of the custom field in which to replace the version number.",
            },
            moveTo: {
              type: "integer",
              description: "The version number to use as a replacement for the deleted version.",
            },
          },
        },
      },
      moveAffectedIssuesTo: {
        type: "integer",
        description:
          "The ID of the version to update `affectedVersion` to when the field contains the deleted version.",
      },
      moveFixIssuesTo: {
        type: "integer",
        description: "The ID of the version to update `fixVersion` to when the field contains the deleted version.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/version/{id}/removeAndSwap",
    body: ["customFieldReplacementList", "moveAffectedIssuesTo", "moveFixIssuesTo"],
  },
});
