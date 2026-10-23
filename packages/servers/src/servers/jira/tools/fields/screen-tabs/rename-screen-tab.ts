import { defineTool } from "@usemcpkit/core";

export const fieldsScreenTabsRenameScreenTab = defineTool({
  name: "fields:screen_tabs:rename_screen_tab",
  description: "Update screen tab. Updates the name of a screen tab.",
  input: {
    type: "object",
    properties: {
      screenId: {
        type: "integer",
        description: "The ID of the screen.",
      },
      tabId: {
        type: "integer",
        description: "The ID of the screen tab.",
      },
      id: {
        type: "integer",
        description: "The ID of the screen tab.",
      },
      name: {
        type: "string",
        description: "The name of the screen tab. The maximum length is 255 characters.",
      },
    },
    required: ["screenId", "tabId", "name"],
  },
  request: {
    method: "PUT",
    path: "/rest/api/2/screens/{screenId}/tabs/{tabId}",
    body: ["id", "name"],
  },
});
