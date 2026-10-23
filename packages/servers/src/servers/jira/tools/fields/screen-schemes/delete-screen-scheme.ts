import { defineTool } from "@usemcpkit/core";

export const fieldsScreenSchemesDeleteScreenScheme = defineTool({
  name: "fields:screen_schemes:delete_screen_scheme",
  description:
    "Delete screen scheme. Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.",
  input: {
    type: "object",
    properties: {
      screenSchemeId: {
        type: "string",
        description: "The ID of the screen scheme.",
      },
    },
    required: ["screenSchemeId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/screenscheme/{screenSchemeId}",
  },
});
