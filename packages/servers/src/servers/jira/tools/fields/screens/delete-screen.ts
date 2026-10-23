import { defineTool } from "@usemcpkit/core";

export const fieldsScreensDeleteScreen = defineTool({
  name: "fields:screens:delete_screen",
  description:
    "Delete screen. Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.",
  input: {
    type: "object",
    properties: {
      screenId: {
        type: "integer",
        description: "The ID of the screen.",
      },
    },
    required: ["screenId"],
  },
  request: {
    method: "DELETE",
    path: "/rest/api/2/screens/{screenId}",
  },
});
